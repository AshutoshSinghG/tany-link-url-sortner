import { isValidUrl, isValidShortcode } from '../utils/urlValidator.js';

/**
 * Middleware to validate link creation request
 */
export const validateLink = (req, res, next) => {
  const { target, code } = req.body;

  // Validate target URL
  if (!target) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'target URL is required'
    });
  }

  if (!isValidUrl(target)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid URL format. URL must include http:// or https://'
    });
  }

  // Validate custom shortcode if provided
  if (code && !isValidShortcode(code)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Shortcode must be 6-8 alphanumeric characters'
    });
  }

  next();
};

