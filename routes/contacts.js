const express = require('express');

const router = express.Router();

// URL Params
// /contacts/:userId
router.get('/:userId', (req, res) => {
  res.send(`User info for id: ${req.params.userId}`);
});

// Request body
router.post('/', (req, res) => {
  res.json(req.body);
});

// Request body with form
router.post('/form', (req, res) => {
  res.json(req.body);
});

// Search contacts
router.get('/', (req, res) => {
  res.json(req.query);
});

module.exports = router;
