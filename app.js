/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { validateCreateUser, validateLoginUser } = require('./utilit/validateUser');
const routersUser = require('./router/users');
const routersMovies = require('./router/movies');
const {
  createUser, login,
} = require('./controllers/users');
const {
  requestLogger, errorLogger,
} = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/collectionOfErrors');

const db = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(cors());
app.options('*', cors());

mongoose.connect(db)
  .then((res) => console.log('База даннных подключена'))
  .catch(((error) => console.log(error)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLoginUser, login);

app.use(auth);

app.use('/movies', routersMovies);

app.use('/users', routersUser);

app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).send({ message: err.message });
});
