const { User } = require('../models');
const jwt = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    // Bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send('Unauthorized');
      return;
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token);

    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).send('Unauthorized');
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};
