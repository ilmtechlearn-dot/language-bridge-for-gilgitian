import { Router, Response } from 'express';
import { db } from '../db/store';
import { optionalAuth, authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// GET translation history
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userFilter = req.user?.role === 'admin' && req.query.all === 'true'
      ? 'all'
      : (req.user?.name || req.query.user as string || 'all');

    const history = await db.getHistory(userFilter as string, 100);
    res.json({ history });
  } catch (err: any) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to retrieve translation history.' });
  }
});

// POST translation to history
router.post('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { sourceText, translatedText, sourceLanguage, targetLanguage } = req.body;
    if (!sourceText || !translatedText) {
      return res.status(400).json({ error: 'Source and translated text required.' });
    }

    const item = await db.addHistory({
      user: req.user?.name || 'Guest',
      sourceText,
      translatedText,
      sourceLanguage: sourceLanguage || 'english',
      targetLanguage: targetLanguage || 'shina',
    });

    res.status(201).json({ item });
  } catch (err: any) {
    console.error('Error saving history item:', err);
    res.status(500).json({ error: 'Failed to save history entry.' });
  }
});

// DELETE clear history
router.delete('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userName = req.user?.name;
    if (!userName) return res.status(401).json({ error: 'User required.' });

    await db.clearHistory(userName);
    res.json({ message: 'Translation history cleared.' });
  } catch (err: any) {
    console.error('Error clearing history:', err);
    res.status(500).json({ error: 'Failed to clear history.' });
  }
});

// GET export as CSV
router.get('/export', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userFilter = req.user?.role === 'admin' && req.query.all === 'true'
      ? 'all'
      : (req.user?.name || 'all');

    const history = await db.getHistory(userFilter, 500);

    // CSV headers
    let csv = 'Timestamp,User,Source Language,Source Phrase,Target Language,Translated Phrase\n';

    for (const h of history) {
      const escape = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
      const dateStr = new Date(h.createdAt).toISOString();
      csv += `${escape(dateStr)},${escape(h.user)},${escape(h.sourceLanguage)},${escape(h.sourceText)},${escape(h.targetLanguage)},${escape(h.translatedText)}\n`;
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="gilgit_translation_history.csv"');
    res.send(csv);
  } catch (err: any) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ error: 'Failed to generate CSV export.' });
  }
});

export default router;
