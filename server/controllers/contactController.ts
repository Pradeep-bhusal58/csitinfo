import { Request, Response } from 'express';
import { getLocalDB, isLocalDBFallback, saveLocalDB } from '../config/db.js';
import Contact from '../models/Contact.js';

/**
 * @desc    Submit a message through contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    return;
  }

  try {
    if (isLocalDBFallback) {
      const db = getLocalDB();
      const newContact = {
        id: `msg_${Date.now()}`,
        name,
        email,
        message,
        createdAt: new Date().toISOString()
      };

      db.contacts.push(newContact);
      saveLocalDB();

      res.status(201).json({
        success: true,
        message: 'Your query has been recorded. The portal team will contact you shortly!'
      });
    } else {
      // Create real Mongoose record in MongoDB Atlas
      await Contact.create({
        name,
        email,
        message
      });

      res.status(201).json({
        success: true,
        message: 'Your query has been recorded. The portal team will contact you shortly!'
      });
    }
  } catch (error: any) {
    console.error('Contact Submission Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error saving message' });
  }
};
