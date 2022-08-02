const { Movie } = require('../models');

exports.search = async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('actors');
    if (!movie) {
      res.status(404).send('Not found');
      return;
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      res.status(404).send('Not found');
      return;
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).send('Not found');
      return;
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

exports.addActor = async (req, res, next) => {
  try {
    const { actorId } = req.body;
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          actors: actorId,
        },
      },
      {
        new: true,
      }
    );

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

exports.removeActor = async (req, res, next) => {
  try {
    const { actorId } = req.body;
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        $pull: {
          actors: actorId,
        },
      },
      {
        new: true,
      }
    );

    res.json(movie);
  } catch (error) {
    next(error);
  }
};
