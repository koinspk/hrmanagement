
const jwt = require('jsonwebtoken');
require('dotenv').config();
//verifyToken
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access denied');
    }
    jwt.verify(token, 'KohrManagement123', (err, decodedToken) => {
      if (err) {
        return res.status(408).send('Invalid token');
      }
      req.userId = decodedToken.userId;
      next();
    });
  }
  
  //verifyaccessToken
  const verifyAccessToken = (req, res, next) => {
    const accessToken = req.headers.authorization; 
  
    if (!accessToken) {
      return res.status(401).json({ message: 'Access token not provided' });
    }
  
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded; // Attach user information to the request object
      next(); 
    } catch (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
  };


//verify Refresh token

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken; // Assuming token is sent in the request body

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded; // Attach user information to the request object
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};




  module.exports = {
    verifyToken,
    verifyAccessToken,
    verifyRefreshToken
  }

