const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError, Conflict,
} = require('../errors/collectionOfErrors');
const { errorCenter } = require('../middlewares/errorCenter');
const errorMessage = require('../constate/errorMessage');

const jwtSecret = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV;
const created = 201;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(errorMessage.notFoundErrorUsers);
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => errorCenter(err, req, res, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, nodeEnv === 'production' ? jwtSecret : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => {
      res.status(created).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(errorMessage.conflict));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(() => {
    throw new NotFoundError(errorMessage.notFoundErrorUsers);
  })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(errorMessage.conflictEmail));
        return;
      }
      errorCenter(err, req, res, next);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(() => {
    throw new NotFoundError(errorMessage.notFoundErrorUsers);
  })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(errorMessage.conflictEmail));
        return;
      }
      errorCenter(err, req, res, next);
    });
};
