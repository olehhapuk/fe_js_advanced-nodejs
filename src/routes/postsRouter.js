const express = require('express');

const {
  create,
  getAll,
  getById,
  update,
  deleteById,
  like,
  getLiked,
  getComments,
} = require('../controllers/postsController');

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/liked', getLiked);

router.get('/:postId', getById);
router.get('/:postId/comments', getComments);

router.put('/:postId', update);
router.delete('/:postId', deleteById);
router.patch('/:postId/like', like);

module.exports = router;
