import Link from '../models/Link.js';
import { generateShortcode } from '../utils/shortcodeGenerator.js';
import mongoose from 'mongoose';

/**
 * Create a new short link
 * POST /api/links
 */
export const createLink = async (req, res, next) => {
  try {
    const { target, code } = req.body;
    const userId = req.user._id;

    let shortcode = code;

    // Generate shortcode if not provided
    if (!shortcode) {
      let attempts = 0;
      let isUnique = false;

      // Try to generate a unique shortcode (max 10 attempts)
      while (!isUnique && attempts < 10) {
        shortcode = generateShortcode();
        const exists = await Link.findOne({ code: shortcode, user: userId });
        if (!exists) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to generate unique shortcode'
        });
      }
    } else {
      // Check if custom shortcode already exists for this user
      const exists = await Link.findOne({ code: shortcode, user: userId });
      if (exists) {
        return res.status(409).json({
          error: 'Conflict',
          message: 'Shortcode already exists'
        });
      }
    }

    // Create the link
    const link = await Link.create({
      code: shortcode,
      target,
      user: userId
    });

    res.status(201).json({
      code: link.code,
      target: link.target,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all links for the authenticated user
 * GET /api/links
 */
export const getAllLinks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const links = await Link.find({ user: userId }).sort({ createdAt: -1 });
    
    res.json(links.map(link => ({
      code: link.code,
      target: link.target,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    })));
  } catch (error) {
    next(error);
  }
};

/**
 * Get link stats by code
 * GET /api/links/:code
 */
export const getLinkStats = async (req, res, next) => {
  try {
    const { code } = req.params;
    const userId = req.user._id;

    const link = await Link.findOne({ code, user: userId });

    if (!link) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Link not found'
      });
    }

    res.json({
      code: link.code,
      target: link.target,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a link by code
 * DELETE /api/links/:code
 */
export const deleteLink = async (req, res, next) => {
  try {
    const { code } = req.params;
    const userId = req.user._id;

    const link = await Link.findOneAndDelete({ code, user: userId });

    if (!link) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Link not found'
      });
    }

    res.status(200).json({
      message: 'Link deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Redirect to target URL and increment click count
 * GET /:code
 */
export const redirectLink = async (req, res, next) => {
  try {
    const { code } = req.params;

    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Link not found'
      });
    }

    // Increment click count and update last clicked
    link.totalClicks += 1;
    link.lastClicked = new Date();
    await link.save();

    // Redirect with 302 status
    res.redirect(302, link.target);
  } catch (error) {
    next(error);
  }
};

