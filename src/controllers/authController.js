const bcrypt = require('bcrypt');

const { User } = require('../models');
const jwt = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      res.status(422).send('Username already in use');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const payload = {
      _id: user._id,
    };
    const token = jwt.generateJwt(payload);

    user.token = token;
    await user.save();

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });
    if (!user) {
      res.status(400).send('Username or password wrong');
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // guard clause
    if (!isPasswordValid) {
      res.status(400).send('Username or password wrong');
      return;
    }

    const payload = {
      _id: user._id,
    };
    const token = jwt.generateJwt(payload);

    user.token = token;
    await user.save();

    res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
