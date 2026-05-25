import { Request, Response } from 'express';
import { getLocalDB } from '../config/db.js';

/**
 * @desc    Get all materials, optional filter by type and semester
 * @route   GET /api/materials
 * @access  Public
 */
export const getMaterials = async (req: Request, res: Response) => {
  try {
    const { type, semester, q } = req.query;
    const db = getLocalDB();
    let results = [...db.materials];

    if (type) {
      results = results.filter((m: any) => m.type === type);
    }

    if (semester) {
      results = results.filter((m: any) => m.semester === semester);
    }

    if (q) {
      const searchStr = String(q).toLowerCase();
      results = results.filter(
        (m: any) =>
          m.title.toLowerCase().includes(searchStr) ||
          (m.subject && m.subject.toLowerCase().includes(searchStr)) ||
          (m.description && m.description.toLowerCase().includes(searchStr))
      );
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error fetching materials' });
  }
};

/**
 * @desc    Get all distinct notices
 * @route   GET /api/notices
 * @access  Public
 */
export const getNotices = async (req: Request, res: Response) => {
  try {
    const db = getLocalDB();
    const notices = db.materials.filter((m: any) => m.type === 'notice');
    res.json({
      success: true,
      data: notices
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Error fetching notices' });
  }
};
