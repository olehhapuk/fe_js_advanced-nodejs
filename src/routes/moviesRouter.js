const express = require('express');

const moviesController = require('../controllers/moviesController');

const router = express.Router();

router.get('/', moviesController.search);
router.post('/', moviesController.create);
router.get('/:id', moviesController.getById);
router.put('/:id', moviesController.update);
router.delete('/:id', moviesController.delete);
router.patch('/:id/actors/add', moviesController.addActor);
router.patch('/:id/actors/remove', moviesController.removeActor);

module.exports = router;
