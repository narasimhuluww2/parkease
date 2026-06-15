const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
  ],
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

// Get profile
router.get('/profile', authenticate, authController.getProfile);

// Update profile
router.put(
  '/profile',
  authenticate,
  [
    body('fullName').optional().trim().notEmpty(),
    body('phone').optional().trim().notEmpty(),
  ],
  authController.updateProfile
);

// Logout
router.post('/logout', authenticate, authController.logout);

module.exports = router;
