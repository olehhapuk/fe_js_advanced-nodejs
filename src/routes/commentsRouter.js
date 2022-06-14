const express = require('express');

const router = express.Router();

const {
  create,
  getById,
  deleteById,
} = require('../controllers/commentsController');
const schemaValidate = require('../middlewares/schemaValidate');
const commentsValidators = require('../validationSchemas/commentsSchema');

// BASE URL = /api/v1/comments

router.post('/', schemaValidate(commentsValidators.create), create);
router.get('/:id', getById);
router.delete('/:id', deleteById);

module.exports = router;
