const express = require('express');

const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.user);
  res.render('index', {
    user: req.user,
  });
});

router.get('/login', (req, res) => {
  const messages = req.flash('message');
  console.log(messages);
  res.render('login', {
    messages,
  });
});

router.get('/register', (req, res) => {
  const errors = req.flash('message');
  console.log(errors);
  res.render('register', {
    messages: errors,
  });
});

router.get('/profile', auth, (req, res) => {
  res.render('profile', {
    user: req.user,
  });
});

module.exports = router;
