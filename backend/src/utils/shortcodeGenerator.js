/**
 * Generate a random shortcode of length 6-8 characters
 * @param {number} length - Length of shortcode (default: random 6-8)
 * @returns {string} - Generated shortcode
 */
export const generateShortcode = (length = null) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = length || Math.floor(Math.random() * 3) + 6; // 6, 7, or 8
  
  let result = '';
  for (let i = 0; i < codeLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

