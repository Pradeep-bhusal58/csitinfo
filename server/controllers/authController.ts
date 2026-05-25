import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getLocalDB, isLocalDBFallback, saveLocalDB } from '../config/db.js';
import User from '../models/User.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// Helper to sign JWT token
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'csit_secret_key_2026';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d'
  });
};

/**
 * @desc    Register a new BSc CSIT student user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    return;
  }

  try {
    if (isLocalDBFallback) {
      const db = getLocalDB();
      const userExists = db.users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (userExists) {
        res.status(400).json({ success: false, message: 'User already exists with this email address' });
        return;
      }

      // Hash password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        id: `usr_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };

      db.users.push(newUser);
      saveLocalDB();

      res.status(201).json({
        success: true,
        message: 'Registration successful!',
        token: generateToken(newUser.id),
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      });
    } else {
      // Real MongoDB logic
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        res.status(400).json({ success: false, message: 'User already exists with this email address' });
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const dbUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword
      });

      res.status(201).json({
        success: true,
        message: 'Registration successful!',
        token: generateToken(dbUser._id.toString()),
        user: {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email
        }
      });
    }
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

/**
 * @desc    Auth student user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Please provide email and password' });
    return;
  }

  try {
    if (isLocalDBFallback) {
      const db = getLocalDB();
      const foundUser = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (!foundUser) {
        res.status(401).json({ success: false, message: 'Invalid credentials. User not found' });
        return;
      }

      // Validate bcrypt password
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
      }

      res.json({
        success: true,
        message: `Welcome back, ${foundUser.name}!`,
        token: generateToken(foundUser.id),
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        }
      });
    } else {
      // Real database credentials validation
      const dbUser = await User.findOne({ email: email.toLowerCase() });
      if (!dbUser) {
        res.status(401).json({ success: false, message: 'Invalid credentials. User not found' });
        return;
      }

      const isMatch = await bcrypt.compare(password, dbUser.password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
      }

      res.json({
        success: true,
        message: `Welcome back, ${dbUser.name}!`,
        token: generateToken(dbUser._id.toString()),
        user: {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email
        }
      });
    }
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

/**
 * @desc    Get user profile details
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authorized' });
    return;
  }
  
  res.json({
    success: true,
    user: req.user
  });
};
