/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    let message = `${field} already exists`;
    
    if (field === 'code') {
      message = 'Shortcode already exists';
    } else if (field === 'email' || field === 'username') {
      message = 'User with this email or username already exists';
    }
    
    return res.status(409).json({
      error: 'Conflict',
      message
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
};

