const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No authentication token, access denied'
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Token verification failed, authorization denied'
    });
  }
};

module.exports = auth; 