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
        username, text, email
      } = req.body;

      const createdAt = new Date();

      await todos.createTodo({
        username, text, email, createdAt
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
      // const {id} = req.query;
      const {id, status, text} = req.body;

      console.log(req.query);
      console.log(req.body);
      await todos.updateTodo(id, {status, text});

      res.status(201).json({message: `todo обновлен`});
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Произошла ошибка'});
    }
  }
);

router.post(
  '/updatetodos',
  async(req, res) => {
    try {
      const {ids, status} = req.body;

      await todos.updateTodos(ids, {status});

      res.status(201).json({message: 'Статусы todos обновлены'});
    } catch(e) {
      res.status(500).json({message: `Произошла ошибка: ${e.message}`});
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
      res.status(500).json({message: `Произошла ошибка: ${e.message}`});
    }
  }
);

module.exports = router;
