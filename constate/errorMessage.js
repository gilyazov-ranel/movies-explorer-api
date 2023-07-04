const errorMessage = {
  badRequest: 'Некорректный запрос или данные',
  conflict: 'Пользователь с таким email уже существует',
  conflictEmail: 'Вы не можете поменять email, пользователь с таким email уже существует',
  forbidden: 'Вы не можете удалить фильм, который Вы не добавляли',
  notFoundErrorMovies: 'Фильм с указанным _id не найден',
  notFoundErrorUsers: 'Пользователь с таким id - не найден',
  unautorized: 'Необходима авторизация!',
  errorUrl: 'Неправильный формат ссылки',
  errorEmail: 'Неправильный формат почты',
  unautorizedEntry: 'Неправильные почта или пароль',
  pathNotFound: 'Путь не найден',
};

module.exports = errorMessage;
