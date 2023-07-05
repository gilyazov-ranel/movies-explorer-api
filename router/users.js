const router = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const {
  validationUpdateUser,
} = require('../utilit/validateUser');

router.get('/me', getCurrentUser);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
