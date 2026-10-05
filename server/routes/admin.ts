import { Router, Response } from 'express';
import { db } from '../db/store';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// Require admin authentication for all routes in this router
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard overview
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const stats = await db.getDashboardStats();
    res.json({ stats });
  } catch (err: any) {
    console.error('Error loading admin dashboard stats:', err);
    res.status(500).json({ error: 'Failed to load dashboard metrics.' });
  }
});

// Users management
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const users = await db.getAllUsers();
    res.json({ users });
  } catch (err: any) {
    console.error('Error fetching admin users:', err);
    res.status(500).json({ error: 'Failed to retrieve users list.' });
  }
});

// Change user role
router.put('/users/:id/role', async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role must be user or admin.' });
    }

    const updated = await db.updateUser(req.params.id, { role });
    if (!updated) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({
      message: `User role changed to ${role}.`,
      user: updated,
    });
  } catch (err: any) {
    console.error('Error updating user role:', err);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

// Delete user
router.delete('/users/:id', async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.id === req.params.id) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }

    await db.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (err: any) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

// Admin phrases view
router.get('/phrases', async (req: AuthRequest, res: Response) => {
  try {
    const { category, search, verified } = req.query;
    const phrases = await db.getPhrases({
      category: category as string,
      search: search as string,
      verified: verified !== undefined ? verified === 'true' : undefined,
    });
    res.json({ phrases, total: phrases.length });
  } catch (err: any) {
    console.error('Error fetching admin phrases:', err);
    res.status(500).json({ error: 'Failed to retrieve phrases.' });
  }
});

// Admin reports view
router.get('/reports', async (req: AuthRequest, res: Response) => {
  try {
    const reports = await db.getReports();
    res.json({ reports });
  } catch (err: any) {
    console.error('Error fetching admin reports:', err);
    res.status(500).json({ error: 'Failed to retrieve reports.' });
  }
});

// -------------------------------------------------------------------
// AI TRANSLATION LOGS & APPROVAL WORKFLOW
// -------------------------------------------------------------------

// GET all AI logs
router.get('/ai-logs', async (req: AuthRequest, res: Response) => {
  try {
    const { status, confidence, search } = req.query;
    const logs = await db.getAiLogs({
      status: status as string,
      confidence: confidence as string,
      search: search as string,
    });
    res.json({ logs });
  } catch (err: any) {
    console.error('Error fetching AI logs:', err);
    res.status(500).json({ error: 'Failed to retrieve AI translation logs.' });
  }
});

// Approve AI translation into verified dictionary
router.post('/ai-logs/:id/approve', async (req: AuthRequest, res: Response) => {
  try {
    const { editedTranslation } = req.body;
    const updated = await db.approveAiLog(req.params.id, editedTranslation);
    if (!updated) {
      return res.status(404).json({ error: 'AI log entry not found.' });
    }
    res.json({
      message: 'Translation approved and saved into the verified community dictionary!',
      log: updated,
    });
  } catch (err: any) {
    console.error('Error approving AI translation:', err);
    res.status(500).json({ error: 'Failed to approve translation.' });
  }
});

// Reject AI translation
router.post('/ai-logs/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const updated = await db.rejectAiLog(req.params.id);
    if (!updated) {
      return res.status(404).json({ error: 'AI log entry not found.' });
    }
    res.json({
      message: 'Translation rejected.',
      log: updated,
    });
  } catch (err: any) {
    console.error('Error rejecting AI translation:', err);
    res.status(500).json({ error: 'Failed to reject translation.' });
  }
});

// -------------------------------------------------------------------
// TRANSLATION FEEDBACK REVIEW
// -------------------------------------------------------------------

router.get('/feedback-reviews', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    const items = await db.getTranslationFeedback(status as string);
    res.json({ feedback: items });
  } catch (err: any) {
    console.error('Error fetching feedback reviews:', err);
    res.status(500).json({ error: 'Failed to retrieve translation feedback.' });
  }
});

router.post('/feedback-reviews/:id/resolve', async (req: AuthRequest, res: Response) => {
  try {
    const { action, applyCorrection } = req.body;
    if (!['approved', 'rejected'].includes(action)) {
      return res.status(400).json({ error: 'Action must be approved or rejected.' });
    }

    const resolved = await db.resolveTranslationFeedback(req.params.id, action, applyCorrection);
    if (!resolved) {
      return res.status(404).json({ error: 'Feedback record not found.' });
    }

    res.json({
      message: `Feedback marked as ${action}.`,
      feedback: resolved,
    });
  } catch (err: any) {
    console.error('Error resolving feedback:', err);
    res.status(500).json({ error: 'Failed to resolve feedback.' });
  }
});

export default router;
