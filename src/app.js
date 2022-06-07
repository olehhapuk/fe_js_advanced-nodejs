const express = require('express');
const volleyball = require('volleyball');
require('dotenv').config();
const cors = require('cors');

const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1', apiRouter);

module.exports = app;
