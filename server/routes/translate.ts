import { Router, Response } from 'express';
import { db, checkRateLimit } from '../db/store';
import { optionalAuth, AuthRequest } from '../middleware/auth';
import { executeAiTranslation } from '../services/aiTranslator';

const router = Router();

// Primary Hybrid Translation Logic
async function handleTranslation(req: AuthRequest, res: Response, forceAIOverride = false) {
  try {
    const { sourceText, sourceLanguage = 'english', targetLanguage = 'shina', forceAI = false } = req.body;
    const shouldForceAI = forceAIOverride || forceAI;

    // Validation: text length (1 to 500 characters)
    if (!sourceText || typeof sourceText !== 'string' || !sourceText.trim()) {
      return res.status(400).json({ error: 'Please enter text to translate.' });
    }

    const cleanSource = sourceText.trim();
    if (cleanSource.length > 500) {
      return res.status(400).json({ error: 'Text length exceeds maximum of 500 characters.' });
    }

    const userName = req.user?.name || 'Guest';

    // -------------------------------------------------------------
    // STEP 1: Exact verified dictionary search
    // -------------------------------------------------------------
    if (!shouldForceAI) {
      const dictMatch = await db.searchVerifiedDictionary(cleanSource, sourceLanguage, targetLanguage);
      if (dictMatch) {
        // Record in translation history
        await db.addHistory({
          user: userName,
          sourceText: cleanSource,
          translatedText: dictMatch.translatedText,
          sourceLanguage,
          targetLanguage,
          badge: 'Verified Community Translation',
        });

        return res.json({
          source: 'dictionary',
          found: true,
          sourceText: cleanSource,
          sourceLanguage,
          targetLanguage,
          translatedText: dictMatch.translatedText,
          pronunciation: dictMatch.pronunciation,
          category: dictMatch.category,
          phraseId: dictMatch.phraseId,
          verified: true,
          confidence: 'high',
          badge: 'Verified Community Translation',
          badgeType: 'verified',
          needs_human_review: false,
        });
      }

      // -----------------------------------------------------------
      // STEP 2: Similar phrase search
      // -----------------------------------------------------------
      const similar = await db.searchSimilarPhrases(cleanSource, sourceLanguage, targetLanguage);
      if (similar.hasHighSimilarity) {
        return res.json({
          found: false,
          hasSimilar: true,
          hasHighSimilarity: true,
          message: 'Similar verified phrases found in our dictionary.',
          similarPhrases: similar.similarPhrases,
          canTranslateAI: true,
          sourceText: cleanSource,
          sourceLanguage,
          targetLanguage,
        });
      }
    }

    // -------------------------------------------------------------
    // STEP 3: AI Fallback Translation
    // -------------------------------------------------------------
    // Rate limit: 10/hour for users, 3/hour for guests
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'guest_ip';
    const rateLimitId = req.user ? req.user.id : `guest_${clientIp}`;
    const rl = checkRateLimit(rateLimitId, !!req.user);

    if (!rl.allowed) {
      return res.status(429).json({
        error: `Hourly AI translation limit reached (10 for users, 3 for guests). Please wait ${rl.resetMinutes} minutes or sign in.`,
        resetMinutes: rl.resetMinutes,
      });
    }

    try {
      const aiResult = await executeAiTranslation(cleanSource, sourceLanguage, targetLanguage);

      // Determine badge & type
      let badge = 'AI Translation (Experimental) — Needs Review';
      let badgeType: 'ai-high' | 'ai-review' | 'unavailable' = 'ai-review';

      if (aiResult.status === 'unsupported' || !aiResult.translation) {
        badge = 'Translation Not Available Yet';
        badgeType = 'unavailable';
      } else if (aiResult.confidence === 'high' && !aiResult.needs_human_review) {
        badge = 'AI Translation — High Confidence';
        badgeType = 'ai-high';
      }

      // Log AI translation in database
      const logEntry = await db.createAiLog({
        userId: req.user?.id,
        sourceText: cleanSource,
        sourceLanguage,
        targetLanguage,
        translatedText: aiResult.translation,
        romanizedTranslation: aiResult.romanized_translation,
        confidence: aiResult.confidence,
        status: aiResult.status,
        notes: aiResult.notes,
        needsHumanReview: aiResult.needs_human_review,
        provider: aiResult.provider,
      });

      // Record in history if translation was generated
      if (aiResult.translation) {
        await db.addHistory({
          user: userName,
          sourceText: cleanSource,
          translatedText: aiResult.translation,
          sourceLanguage,
          targetLanguage,
          badge,
        });
      }

      return res.json({
        source: 'ai',
        found: aiResult.status !== 'unsupported' && !!aiResult.translation,
        sourceText: cleanSource,
        sourceLanguage,
        targetLanguage,
        translatedText: aiResult.translation,
        romanized_translation: aiResult.romanized_translation,
        pronunciation: aiResult.romanized_translation,
        confidence: aiResult.confidence,
        status: aiResult.status,
        notes: aiResult.notes,
        needs_human_review: aiResult.needs_human_review,
        provider: aiResult.provider,
        badge,
        badgeType,
        logId: logEntry._id,
        verified: false,
        remainingAiQuota: rl.remaining,
      });
    } catch (aiErr: any) {
      if (aiErr.message === 'NO_API_KEY_CONFIGURED') {
        return res.status(503).json({
          error: 'Translation service is temporarily unavailable. This language pair needs a verified community translation.',
          code: 'NO_API_KEY_CONFIGURED',
        });
      }
      console.error('[AI Translation Error]', aiErr.message);
      return res.status(503).json({
        error: 'AI translation service is temporarily experiencing high demand. Please try again shortly or submit a request for native community verification.',
      });
    }
  } catch (err: any) {
    console.error('Translation route error:', err);
    res.status(500).json({ error: 'Internal server error while translating phrase.' });
  }
}

// Primary Hybrid Translation Endpoint
router.post('/', optionalAuth, (req: AuthRequest, res: Response) => {
  return handleTranslation(req, res, false);
});

// Dedicated Edge Function route mirror
router.post('/ai', optionalAuth, (req: AuthRequest, res: Response) => {
  return handleTranslation(req, res, true);
});

export default router;
