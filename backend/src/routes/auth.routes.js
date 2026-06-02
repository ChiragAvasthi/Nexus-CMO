import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'nexus-cmo-dev-secret';

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, getMe);

// Google OAuth Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// Google OAuth Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/signup', session: false }),
  (req, res) => {
    // On successful auth, req.user contains the user record
    const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    // Redirect to frontend with token in the URL query string
    // The frontend will grab the token from the URL, save it to localStorage, and navigate to the dashboard
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);

export default router;
