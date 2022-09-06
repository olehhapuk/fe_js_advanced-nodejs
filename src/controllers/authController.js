const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

function login(req, res, next) {
  passport.authenticate('local', (error, user) => {
    if (!user || error) {
      console.log(error);
      req.flash('message', error ? error.message : 'Wrong credentials');
      req.flash('message', 'test');
      res.redirect('/login');
      return;
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        req.flash('message', err.message);
        res.redirect('/login');
        return;
      }

      res.redirect('/profile');
    });
  })(req, res, next);
}

exports.register = async (req, res, next) => {
  try {
    const { username, password, age, description } = req.body;

    const user = await User.findOne({
      username,
    });
    if (user) {
      req.flash('message', 'Username is already taken');
      res.redirect('/register');
      return;
    }

    const hashedPassword = await User.hashPassword(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      age,
      description,
    });

    login(req, res, next);
  } catch (error) {
    console.log(error);
    req.flash('message', error.message);
    res.redirect('/register');
  }
};

exports.login = login;

exports.logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
      req.flash('message', error.message);
      res.redirect('/profile');
      return;
    }

    res.redirect('/');
  });
};