const express = require('express');
require('dotenv').config();
const volleyball = require('volleyball');
// const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
// console.log(path.join(process.cwd(), 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(volleyball);
// app.use(morgan('common'));
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // name: 'session-id',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

// GET / -> index.ejs
app.get('/', (req, res) => {
  res.render('index', {
    username: req.session.username,
  });
});

// GET /post
app.get('/post', (req, res) => {
  // views
  req.session.views =
    req.session.views !== undefined ? req.session.views + 1 : 1;

  res.render('post', {
    views: req.session.views,
  });
});

// GET /login
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login
app.post('/login', (req, res) => {
  req.session.username = req.body.username;
  res.redirect('/');
});

module.exports = app;
