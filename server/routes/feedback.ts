import { Router, Response } from 'express';
import { db } from '../db/store';
import { optionalAuth, authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// GET all site reviews
router.get('/', async (req, res: Response) => {
  try {
    const feedback = await db.getFeedback();
    res.json({ feedback });
  } catch (err: any) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Failed to retrieve feedback.' });
  }
});

// POST site review
router.post('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { message, rating, userName, userEmail } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Please enter a feedback message.' });
    }

    const feedback = await db.createFeedback({
      user: req.user?.name || userName || 'Community Member',
      userEmail: req.user?.email || userEmail || '',
      message: message.trim(),
      rating: Number(rating) || 5,
    });

    res.status(201).json({
      message: 'Thank you for your valuable feedback!',
      feedback,
    });
  } catch (err: any) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

// POST translation feedback (Accurate / Needs correction / Suggested translation)
router.post('/translation', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { translationLogId, phraseId, rating, suggestedTranslation, feedbackNote } = req.body;

    if (!rating || !['accurate', 'needs_correction'].includes(rating)) {
      return res.status(400).json({ error: 'Rating must be either "accurate" or "needs_correction".' });
    }

    const entry = await db.createTranslationFeedback({
      translationLogId,
      phraseId,
      userId: req.user?.id,
      userName: req.user?.name || req.body.userName || 'Community Contributor',
      rating,
      suggestedTranslation: suggestedTranslation || '',
      feedbackNote: feedbackNote || '',
    });

    res.status(201).json({
      message: rating === 'accurate'
        ? 'Thank you for confirming translation accuracy!'
        : 'Thank you! Your suggested correction was submitted for admin review.',
      feedback: entry,
    });
  } catch (err: any) {
    console.error('Translation feedback error:', err);
    res.status(500).json({ error: 'Failed to submit translation feedback.' });
  }
});

// GET translation feedback for admin review
router.get('/translation', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string;
    const items = await db.getTranslationFeedback(status);
    res.json({ feedback: items });
  } catch (err: any) {
    console.error('Error getting translation feedback:', err);
    res.status(500).json({ error: 'Failed to get translation feedback.' });
  }
});

export default router;
