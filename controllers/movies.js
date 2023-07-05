const { Forbidden, NotFoundError } = require('../errors/collectionOfErrors');
const { errorCenter } = require('../middlewares/errorCenter');
const Movie = require('../models/movie');

const errorMessage = require('../constate/errorMessage');

const created = 201;

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch((err) => errorCenter(err, req, res, next));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(created).send(movie))
    .catch((err) => errorCenter(err, req, res, next));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(errorMessage.notFoundErrorMovies);
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new Forbidden(errorMessage.forbidden);
      }
      Movie.findByIdAndRemove(movie._id.toString())
        .then((movies) => res.send(movies)).catch(next);
    })
    .catch((err) => errorCenter(err, req, res, next));
};
