import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getLocalDB, isLocalDBFallback } from '../config/db.js';
import User from '../models/User.js';

// Define custom interface for Express Request to avoid TS errors
export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check Authorization header for Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const JWT_SECRET = process.env.JWT_SECRET || 'csit_secret_key_2026';
      const decoded: any = jwt.verify(token, JWT_SECRET);

      if (isLocalDBFallback) {
        // Fallback local db look up
        const db = getLocalDB();
        const foundUser = db.users.find((u: any) => u.id === decoded.id);
        
        if (!foundUser) {
          res.status(401).json({ success: false, message: 'Not authorized, user not found' });
          return;
        }

        req.user = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        };
      } else {
        // Real MongoDB look up
        const foundUser = await User.findById(decoded.id).select('-password');
        if (!foundUser) {
          res.status(401).json({ success: false, message: 'Not authorized, user not found' });
          return;
        }

        req.user = {
          id: foundUser._id.toString(),
          name: foundUser.name,
          email: foundUser.email
        };
      }

      next();
    } catch (error) {
      console.error('JWT Token Verification Error:', error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};
