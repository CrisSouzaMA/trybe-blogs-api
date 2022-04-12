require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtconfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const tokenCreate = (user) => {
  const tokenUser = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtconfig);
  return tokenUser;
};

const decoded = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (e) {
    return false;
  }
};

module.exports = {
  tokenCreate,
  decoded,
};