const { BadRequest } = require('../errors/collectionOfErrors');
const errorMessage = require('../constate/errorMessage');

const errorCenter = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequest(errorMessage.badRequest));
    return;
  }
  next(err);
};

module.exports = { errorCenter };
