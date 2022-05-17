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
  res.cookie('message', 'Hello, World from cookies');
  res.redirect('/');
});

app.get('/unset-cookie', (req, res) => {
  console.log(req.cookies);
  console.log('message: ', req.cookies.message);
  res.clearCookie('message');
  res.redirect('/');
});

module.exports = app;
