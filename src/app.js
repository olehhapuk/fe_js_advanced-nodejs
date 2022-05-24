const express = require('express');
require('dotenv').config();
const volleyball = require('volleyball');
// const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
// console.log(path.join(process.cwd(), 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(volleyball);
// app.use(morgan('common'));
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));

// GET / -> index.ejs
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/set-cookie', (req, res) => {
  res.cookie('message', 'Hello, World from cookies', {
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
  res.cookie('non secure message', 'Hello, World from cookies', {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });

  res.redirect('/');
});

app.get('/unset-cookie', (req, res) => {
  console.log(req.cookies, req.signedCookies);

  console.log('message: ', req.signedCookies.message);
  console.log('non secure message: ', req.cookies['non secure message']);

  res.clearCookie('message');
  res.clearCookie('non secure message');
  res.redirect('/');
});

module.exports = app;
