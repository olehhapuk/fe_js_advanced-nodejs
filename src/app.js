const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST /data
app.post('/data', (req, res) => {
  const { name } = req.body;
  const message = `Привіт, ${name}`;
  res.json({
    message,
  });
});

// GET /user/:userId
app.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(req.headers);
  res.send(userId);
});

module.exports = app;
