const { Actor } = require('../models');

exports.search = async (req, res, next) => {
  try {
    const allActors = await Actor.find();
    res.json(allActors);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newActor = await Actor.create(req.body);
    res.status(201).json(newActor);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      res.status(404).send('Not found');
      return;
    }

    res.json(actor);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!actor) {
      res.status(404).send('Not found');
      return;
    }

    res.json(actor);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) {
      res.status(404).send('Not found');
      return;
    }

    res.json(actor);
  } catch (error) {
    next(error);
  }
};
