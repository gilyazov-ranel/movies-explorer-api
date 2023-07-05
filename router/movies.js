const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateMovieJoi, validationMovieId } = require('../utilit/validateMovie');

router.get('/', getMovies);
router.post('/', validateMovieJoi, createMovie);
router.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = router;
