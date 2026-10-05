import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/store';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide full name, email, and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser({
      name,
      email,
      password: hashedPassword,
      city: city || 'Gilgit',
      role: 'user',
      favourites: [],
    });

    const token = generateToken({
      id: user._id || user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        city: user.city,
        role: user.role,
        favourites: user.favourites || [],
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create user account.' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter your email and password.' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({
      id: user._id || user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.json({
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        city: user.city,
        role: user.role,
        favourites: user.favourites || [],
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to process login.' });
  }
});

// Get Current Profile
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const user = await db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    const { password, ...safeUser } = user;
    res.json({
      user: {
        id: safeUser._id || safeUser.id,
        ...safeUser,
      },
    });
  } catch (err: any) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to load user profile.' });
  }
});

// Update Profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const { name, city, currentPassword, newPassword } = req.body;
    const user = await db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updates: any = {};
    if (name) updates.name = name;
    if (city) updates.city = city;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to set a new password.' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
      }
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    const updated = await db.updateUser(userId, updates);
    const { password, ...safeUpdated } = updated;

    res.json({
      message: 'Profile updated successfully.',
      user: {
        id: safeUpdated._id || safeUpdated.id,
        ...safeUpdated,
      },
    });
  } catch (err: any) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

export default router;
