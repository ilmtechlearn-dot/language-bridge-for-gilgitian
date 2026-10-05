import { Router, Request, Response } from 'express';
import { db } from '../db/store';
import { authenticateToken, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET all phrases with filter options
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, verified, limit } = req.query;

    const phrases = await db.getPhrases({
      category: category as string,
      search: search as string,
      verified: verified !== undefined ? verified === 'true' : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });

    res.json({
      total: phrases.length,
      phrases,
    });
  } catch (err: any) {
    console.error('Error fetching phrases:', err);
    res.status(500).json({ error: 'Failed to retrieve phrases.' });
  }
});

// GET /search with fuzzy search
router.get('/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (!q || !q.trim()) {
      return res.json({ results: [] });
    }

    const results = await db.fuzzySearchPhrases(q.trim(), 12);
    res.json({ query: q, results });
  } catch (err: any) {
    console.error('Error searching phrases:', err);
    res.status(500).json({ error: 'Failed to search phrases.' });
  }
});

// GET single phrase
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const phrase = await db.findPhraseById(req.params.id);
    if (!phrase) {
      return res.status(404).json({ error: 'Phrase not found.' });
    }
    res.json({ phrase });
  } catch (err: any) {
    console.error('Error fetching phrase:', err);
    res.status(500).json({ error: 'Failed to get phrase.' });
  }
});

// POST new phrase (admin or verified users)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { sourceText, sourceLanguage = 'english', translations, category, pronunciations, pronunciationText } = req.body;

    if (!sourceText || !translations || !translations.urdu || !translations.shina || !translations.balti || !translations.burushaski) {
      return res.status(400).json({
        error: 'Please provide sourceText and translations for all 5 languages (English, Urdu, Shina, Balti, Burushaski).',
      });
    }

    const newPhrase = await db.createPhrase({
      sourceText,
      sourceLanguage,
      translations,
      category: category || 'Daily conversation',
      pronunciations: pronunciations || {},
      pronunciationText: pronunciationText || '',
      verified: req.user?.role === 'admin',
      createdBy: req.user?.name || 'User',
    });

    res.status(201).json({
      message: 'Phrase added successfully.',
      phrase: newPhrase,
    });
  } catch (err: any) {
    console.error('Error adding phrase:', err);
    res.status(500).json({ error: 'Failed to create phrase.' });
  }
});

// PUT update phrase (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const phrase = await db.findPhraseById(req.params.id);
    if (!phrase) {
      return res.status(404).json({ error: 'Phrase not found.' });
    }

    const updated = await db.updatePhrase(req.params.id, req.body);
    res.json({
      message: 'Phrase updated successfully.',
      phrase: updated,
    });
  } catch (err: any) {
    console.error('Error updating phrase:', err);
    res.status(500).json({ error: 'Failed to update phrase.' });
  }
});

// DELETE phrase (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const phrase = await db.findPhraseById(req.params.id);
    if (!phrase) {
      return res.status(404).json({ error: 'Phrase not found.' });
    }

    await db.deletePhrase(req.params.id);
    res.json({ message: 'Phrase deleted successfully.' });
  } catch (err: any) {
    console.error('Error deleting phrase:', err);
    res.status(500).json({ error: 'Failed to delete phrase.' });
  }
});

export default router;
