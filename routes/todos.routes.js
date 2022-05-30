const {Router} = require('express');
const todos = require('../models/todos');
const {check, validationResult} = require('express-validator');
const router = Router();

router.get(
  '/todos',
  async(req, res) => {
    try {
      const {
        username, status, page, limit, orders
      } = req.query;
      const rows = await todos.getTodos({
        username, status, page, limit, orders
      });

      return res.json(rows);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Произошла ошибка'});
    }
  }
);

router.post(
  '/createtodo',
  async(req, res) => {
    try {
      const {
        username, status, text, email
      } = req.body;

      await todos.createTodo({
        username, status, text, email
      });

      res.status(201).json({message: `todo создан`});
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Произошла ошибка'});
    }
  }
);

router.put(
  '/updatetodo',
  async(req, res) => {
    try {
      const {id} = req.query;
      const {status, text} = req.body;

      await todos.updateTodo(id, {status, text});

      res.status(201).json({message: `todo обновлен`});
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Произошла ошибка'});
    }
  }
);

router.get(
  '/getcounttodo',
  async(req, res) => {
    try {

      const count = await todos.getCount();

      return res.json(count);
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Произошла ошибка'});
    }
  }
);

module.exports = router;
