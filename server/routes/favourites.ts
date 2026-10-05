import { Router, Response } from 'express';
import { db } from '../db/store';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// GET user favourites
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized.' });

    const user = await db.findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const favIds: string[] = user.favourites || [];
    const allPhrases = await db.getPhrases({});
    const favPhrases = allPhrases.filter((p) => favIds.includes(p._id) || favIds.includes(p.id));

    res.json({
      favourites: favPhrases,
      ids: favIds,
    });
  } catch (err: any) {
    console.error('Error fetching favourites:', err);
    res.status(500).json({ error: 'Failed to retrieve favourites.' });
  }
});

// POST toggle favourite
router.post('/:phraseId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { phraseId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized.' });

    const user = await db.findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    let currentFavs: string[] = user.favourites || [];
    const exists = currentFavs.includes(phraseId);

    if (exists) {
      currentFavs = currentFavs.filter((id) => id !== phraseId);
    } else {
      currentFavs.push(phraseId);
    }

    await db.updateUser(userId, { favourites: currentFavs });

    res.json({
      message: exists ? 'Removed from favourites.' : 'Added to favourites.',
      isFavourite: !exists,
      favourites: currentFavs,
    });
  } catch (err: any) {
    console.error('Error toggling favourite:', err);
    res.status(500).json({ error: 'Failed to update favourites.' });
  }
});

// DELETE remove favourite
router.delete('/:phraseId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { phraseId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized.' });

    const user = await db.findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const currentFavs: string[] = (user.favourites || []).filter((id: string) => id !== phraseId);
    await db.updateUser(userId, { favourites: currentFavs });

    res.json({
      message: 'Removed from favourites.',
      favourites: currentFavs,
    });
  } catch (err: any) {
    console.error('Error removing favourite:', err);
    res.status(500).json({ error: 'Failed to remove favourite.' });
  }
});

export default router;
