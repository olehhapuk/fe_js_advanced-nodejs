const express = require('express');

const actorsController = require('../controllers/actorsController');

const router = express.Router();

router.get('/', actorsController.search);
router.post('/', actorsController.create);
router.get('/:id', actorsController.getById);
router.put('/:id', actorsController.update);
router.delete('/:id', actorsController.delete);

module.exports = router;
