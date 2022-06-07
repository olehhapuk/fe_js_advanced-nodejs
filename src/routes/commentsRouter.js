const express = require('express');

const router = express.Router();

const {
  create,
  getById,
  deleteById,
} = require('../controllers/commentsController');

// BASE URL = /api/v1/comments

router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', deleteById);

module.exports = router;
