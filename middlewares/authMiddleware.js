const { decoded } = require('./jwt');

const authMiddleware = (req, res, next) => {
const token = req.headers.authorization;

if (!token) return res.status(401).json({ message: 'Token not found' });

const checkToken = decoded(token);
// console.log(checkToken.data.id);
if (!checkToken) return res.status(401).json({ message: 'Expired or invalid token' });
req.user = checkToken;

next();
};

module.exports = {
  authMiddleware,
};