const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
  [
    check('username', 'Некорректный username').isLength({min: 3}),
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина  password 6 символов').isLength({min: 3})
  ],
  async(req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        });
      }

      const {username, email, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.createUser({username, email, password: hashedPassword});

      res.status(201).json({message: `Пользователь ${username} создан`});
    } catch(e) {
      res.status(500).json({message: `Произошла ошибка: ${e.message}`});
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail()
      .isEmail(),
    check('password', 'Введите корректный password').exists()
  ],
  async(req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        });
      }

      const {email, password} = req.body;
      const {rows} = await User.getUser({email});
      const {username, password: currentPassword} = rows.reduce((user) => user);

      if (!username) {
        return res.status(400).json({message: 'Пользователь не найден'});
      }

      const isCurrentUser = await bcrypt.compare(password, currentPassword);

      if (!isCurrentUser) {
        return res.status(400).json({message: 'Неверный пароль'});
      }

      res.status(201).json({message: 'Введенные данные верны'});
    } catch(e) {
      res.status(500).json({message: `Произошла ошибка: ${e.message}`});
    }
  }
);

module.exports = router;
