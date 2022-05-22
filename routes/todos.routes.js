const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const todos = require('../models/todos');
const router = Router();

router.get(
    '/todos',
    async(req, res) => {
        try {
            const {username, status, page, limit} = req.query;
            const {rows} = await todos.getTodos({username, status, page, limit});
            console.log(rows)
             return res.json(rows);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Произошла ошибка'});
        }
    });

module.exports = router;