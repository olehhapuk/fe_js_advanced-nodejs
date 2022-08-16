const jwt = require('jsonwebtoken');

const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send('Unauthorized');
      return;
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).send('Unauthorized');
      return;
    }

    req.user = user;
    // res.locals.user = user;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};
