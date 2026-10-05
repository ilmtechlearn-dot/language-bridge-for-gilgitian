import { Router, Response } from 'express';
import { db } from '../db/store';
import { optionalAuth, authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// GET all translation requests
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string;
    const requests = await db.getRequests(status);
    res.json({ requests });
  } catch (err: any) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ error: 'Failed to retrieve translation requests.' });
  }
});

// POST submit a translation request
router.post('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { requestedText, sourceLanguage, targetLanguage } = req.body;

    if (!requestedText || !requestedText.trim()) {
      return res.status(400).json({ error: 'Please enter the phrase you wish to request.' });
    }

    const userName = req.user?.name || req.body.userName || 'Guest User';
    const userEmail = req.user?.email || req.body.userEmail || '';

    const newReq = await db.createRequest({
      requestedText: requestedText.trim(),
      sourceLanguage: sourceLanguage || 'english',
      targetLanguage: targetLanguage || 'shina',
      user: userName,
      userEmail,
    });

    res.status(201).json({
      message: 'Translation request submitted successfully. Our linguistic team will review it shortly.',
      request: newReq,
    });
  } catch (err: any) {
    console.error('Error submitting request:', err);
    res.status(500).json({ error: 'Failed to submit translation request.' });
  }
});

// PUT update request status (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { status, adminNote } = req.body;
    const updated = await db.updateRequest(req.params.id, {
      status,
      adminNote: adminNote || '',
    });

    if (!updated) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    res.json({
      message: `Request status updated to ${status}.`,
      request: updated,
    });
  } catch (err: any) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: 'Failed to update request.' });
  }
});

// DELETE request (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await db.deleteRequest(req.params.id);
    res.json({ message: 'Request removed.' });
  } catch (err: any) {
    console.error('Error deleting request:', err);
    res.status(500).json({ error: 'Failed to delete request.' });
  }
});

export default router;
