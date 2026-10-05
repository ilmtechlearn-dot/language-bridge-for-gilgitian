import { GoogleGenAI } from '@google/genai';

export interface AiTranslationResponse {
  translation: string;
  confidence: 'high' | 'medium' | 'low';
  status: 'translated' | 'uncertain' | 'unsupported';
  romanized_translation?: string;
  notes?: string;
  needs_human_review: boolean;
  provider: 'gemini' | 'openai';
}

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
  // Strip ```json or ``` code fences
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  }
  return cleaned;
}

// 1. Gemini Translator (Primary Provider)
async function translateWithGemini(
  sourceText: string,
  sourceLanguage: string,
  targetLanguage: string,
  apiKey: string
): Promise<AiTranslationResponse> {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}
Text to translate: "${sourceText}"`;

  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const rawText = response.text || '';
      const parsed = JSON.parse(cleanJsonText(rawText));

      return {
        translation: parsed.translation || '',
        confidence: parsed.confidence || 'medium',
        status: parsed.status || 'translated',
        romanized_translation: parsed.romanized_translation || '',
        notes: parsed.notes || '',
        needs_human_review: parsed.needs_human_review ?? true,
        provider: 'gemini',
      };
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI] Gemini model ${modelName} call failed, trying next candidate:`, err.message || err);
    }
  }

  throw lastError;
}

// 2. OpenAI Translator (Optional Fallback)
async function translateWithOpenAI(
  sourceText: string,
  sourceLanguage: string,
  targetLanguage: string,
  apiKey: string
): Promise<AiTranslationResponse> {
  const prompt = `Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}
Text to translate: "${sourceText}"`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI request failed (${res.status}): ${errBody.slice(0, 100)}`);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content || '{}';
  const parsed = JSON.parse(cleanJsonText(rawContent));

  return {
    translation: parsed.translation || '',
    confidence: parsed.confidence || 'medium',
    status: parsed.status || 'translated',
    romanized_translation: parsed.romanized_translation || '',
    notes: parsed.notes || '',
    needs_human_review: parsed.needs_human_review ?? true,
    provider: 'openai',
  };
}

// Unified hybrid dispatcher
export async function executeAiTranslation(
  sourceText: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<AiTranslationResponse> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const preferredProvider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();

  // If OpenAI is explicitly requested and key exists
  if (preferredProvider === 'openai' && openaiKey) {
    try {
      return await translateWithOpenAI(sourceText, sourceLanguage, targetLanguage, openaiKey);
    } catch (err: any) {
      console.warn('[AI] OpenAI preferred provider failed, attempting Gemini:', err.message);
      if (geminiKey) {
        return await translateWithGemini(sourceText, sourceLanguage, targetLanguage, geminiKey);
      }
      throw err;
    }
  }

  // Primary: Gemini API
  if (geminiKey) {
    try {
      return await translateWithGemini(sourceText, sourceLanguage, targetLanguage, geminiKey);
    } catch (err: any) {
      console.warn('[AI] Gemini primary provider encountered issue, trying fallback:', err.message);
      if (openaiKey) {
        return await translateWithOpenAI(sourceText, sourceLanguage, targetLanguage, openaiKey);
      }
      throw err;
    }
  }

  // Secondary if Gemini key is missing
  if (openaiKey) {
    return await translateWithOpenAI(sourceText, sourceLanguage, targetLanguage, openaiKey);
  }

  // No provider configured
  throw new Error('NO_API_KEY_CONFIGURED');
}
