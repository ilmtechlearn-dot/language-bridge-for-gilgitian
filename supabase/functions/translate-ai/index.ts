// Supabase Edge Function: translate-ai
// Secure server-side translation with Gemini API primary and OpenAI fallback

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_INSTRUCTION = `You are a careful linguistic assistant for Gilgit-Baltistan regional languages. Translate only between Urdu, English, Shina, Balti, and Burushaski. These are low-resource languages. Never invent a confident translation when you are uncertain. Return valid JSON only.

Required JSON:
{
  "translation": "translated text or empty string",
  "confidence": "high | medium | low",
  "status": "translated | uncertain | unsupported",
  "romanized_translation": "optional Roman script version",
  "notes": "short explanation in English",
  "needs_human_review": true or false
}

Rules:
- Preserve the meaning, tone and names.
- If a regional-language translation is uncertain, say so clearly.
- Do not pretend that an unverified result is fully accurate.
- Prefer simple daily conversational phrasing.
- Mark low-resource language outputs as needing human review unless confident.
- Do not answer unrelated questions. Translate only.`;

function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  }
  return cleaned;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { sourceText, sourceLanguage, targetLanguage, userId } = await req.json();

    if (!sourceText || typeof sourceText !== "string" || !sourceText.trim()) {
      return new Response(JSON.stringify({ error: "Please enter text to translate." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (sourceText.length > 500) {
      return new Response(JSON.stringify({ error: "Text length exceeds maximum of 500 characters." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    const preferredProvider = (Deno.env.get("AI_PROVIDER") || "gemini").toLowerCase();

    let result = null;
    let providerUsed = "gemini";

    const prompt = `Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}
Text to translate: "${sourceText.trim()}"`;

    // 1. Try Gemini
    if (preferredProvider !== "openai" && geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const gData = await geminiRes.json();
          const rawText = gData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
          result = JSON.parse(cleanJsonText(rawText));
          providerUsed = "gemini";
        }
      } catch (e) {
        console.warn("Gemini edge failure:", e);
      }
    }

    // 2. Try OpenAI Fallback
    if (!result && openaiKey) {
      try {
        const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            temperature: 0.2,
            messages: [
              { role: "system", content: SYSTEM_INSTRUCTION },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (oaiRes.ok) {
          const oData = await oaiRes.json();
          const rawContent = oData.choices?.[0]?.message?.content || "{}";
          result = JSON.parse(cleanJsonText(rawContent));
          providerUsed = "openai";
        }
      } catch (e) {
        console.warn("OpenAI edge failure:", e);
      }
    }

    if (!result) {
      return new Response(
        JSON.stringify({
          error: "Translation service is temporarily unavailable.",
          code: "NO_PROVIDER_AVAILABLE",
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        source: "ai",
        provider: providerUsed,
        ...result,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Translation failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
