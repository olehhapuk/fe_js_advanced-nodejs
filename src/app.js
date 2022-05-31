const express = require('express');
const volleyball = require('volleyball');

const apiRouter = require('./routes/api');
// const webRouter = require('./routes/web');

const app = express();

app.use(express.json());
app.use(volleyball);

app.use('/api/v1', apiRouter);
// app.use('/', webRouter);

module.exports = app;
