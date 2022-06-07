const express = require('express');

const postsRouter = require('./postsRouter');
const commentsRouter = require('./commentsRouter');

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
