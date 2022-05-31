const express = require('express');

const {
  create,
  getAll,
  getById,
  update,
  deleteById,
} = require('../controllers/postsController');

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:postId', getById);
router.put('/:postId', update);
router.delete('/:postId', deleteById);

module.exports = router;
