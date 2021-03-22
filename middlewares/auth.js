const {verifyToken} = require('../utils/jwt');

module.exports = function (req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).end();
    return;
  }
  const arr = `${authHeader}`.split(' ');
  if (arr.length < 2 || !arr[1] || `${arr[0]}`.toLowerCase() !== 'bearer') {
    res.status(401).end();
    return;
  }
  const token = arr[1];
  verifyToken(token).then(function (user) {
    res.locals.isAuthenticated = true;
    res.locals.user_id = user._id;
    next();
  }).catch(function () {
    res.status(401).end();
  });
};
