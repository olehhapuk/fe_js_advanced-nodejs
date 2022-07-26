const express = require('express');

const actorsRouter = require('./actorsRouter');

const router = express.Router();

router.use('/actors', actorsRouter);

module.exports = router;
