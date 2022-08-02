const express = require('express');

const actorsRouter = require('./actorsRouter');
const moviesRouter = require('./moviesRouter');

const router = express.Router();

router.use('/actors', actorsRouter);
router.use('/movies', moviesRouter);

module.exports = router;
