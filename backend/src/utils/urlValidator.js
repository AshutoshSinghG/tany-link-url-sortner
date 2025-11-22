import validator from 'validator';

/**
 * Validate if a string is a valid URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
  return validator.isURL(url, {
    require_protocol: true,
    protocols: ['http', 'https']
  });
};

/**
 * Validate shortcode format
 * @param {string} code - Shortcode to validate
 * @returns {boolean} - True if valid format
 */
export const isValidShortcode = (code) => {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};

