/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

module.exports.validateMovieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(
      /https*\:\/\/w{0,3}\.*[a-z0-9\-]*\.[a-z].*[a-z0-9\/]/,
    ),
    trailerLink: Joi.string().required().pattern(
      /https*\:\/\/w{0,3}\.*[a-z0-9\-]*\.[a-z].*[a-z0-9\/]/,
    ),
    thumbnail: Joi.string().required().pattern(
      /https*\:\/\/w{0,3}\.*[a-z0-9\-]*\.[a-z].*[a-z0-9\/]/,
    ),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});
