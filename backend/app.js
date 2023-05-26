require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');

const router = require('./routes/index');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { BAD_REQUEST } = require('./constants');
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');
const { BadRequestError } = require('./errors/BadRequestError');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
  }
  if (err.name === 'ValidationError' || err instanceof BadRequestError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован.' });
  }
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
