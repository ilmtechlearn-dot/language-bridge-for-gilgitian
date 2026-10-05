import { Router, Response } from 'express';
import { db } from '../db/store';
import { optionalAuth, authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// GET all reports (admin only or filtered)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string;
    const reports = await db.getReports(status);
    res.json({ reports });
  } catch (err: any) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to retrieve translation reports.' });
  }
});

// POST submit a report for incorrect translation
router.post('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { phraseId, originalPhrase, currentTranslation, sourceLanguage, targetLanguage, issueDescription } = req.body;

    if (!originalPhrase || !issueDescription || !issueDescription.trim()) {
      return res.status(400).json({ error: 'Please provide the issue details.' });
    }

    const userName = req.user?.name || req.body.userName || 'Community Contributor';

    const report = await db.createReport({
      phrase: phraseId || '',
      originalPhrase,
      currentTranslation: currentTranslation || '',
      sourceLanguage: sourceLanguage || 'english',
      targetLanguage: targetLanguage || 'shina',
      user: userName,
      issueDescription: issueDescription.trim(),
    });

    res.status(201).json({
      message: 'Thank you for reporting this issue. Your feedback helps preserve dialect precision and accuracy.',
      report,
    });
  } catch (err: any) {
    console.error('Error creating report:', err);
    res.status(500).json({ error: 'Failed to record report.' });
  }
});

// PUT update report status (admin)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { status, adminNotes } = req.body;
    const updated = await db.updateReport(req.params.id, {
      status,
      adminNotes: adminNotes || '',
    });

    if (!updated) {
      return res.status(404).json({ error: 'Report not found.' });
    }

    res.json({
      message: `Report marked as ${status}.`,
      report: updated,
    });
  } catch (err: any) {
    console.error('Error updating report:', err);
    res.status(500).json({ error: 'Failed to update report status.' });
  }
});

export default router;
