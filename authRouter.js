const Router = require('express');
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

const router = new Router();

router.post(
  '/registration',
  [
    check('username', 'Username cannot be empty!').notEmpty(),
    check(
      'password',
      'Password cannot be shorter than 4 and longer than 10 characters'
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);

router.post('/login', controller.login);
router.get('/users', roleMiddleware(['Admin']), controller.getUsers);

module.exports = router;
