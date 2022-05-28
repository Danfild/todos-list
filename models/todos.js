const db = require('../config/index');

class todosController {
  async getTodos(params) {
    const {
      username,
      status
    } = params;
    const page = params.page || 1;
    const limit = params.limit || 10;

    const offset = page * limit - limit;

    const query = db('todos')
      .select()
      .offset(offset);

    if (username) {
      query.andWhere('username', username);
    }

    if (status) {
      query.where('status', status);
    }

    if (limit) {
      query.limit(limit);
    }

    const rows = await query;

    return rows;
  }

  async createTodo(body) {

    await db('todos')
      .insert(body)
      .returning('*');
  }

  async updateTodo(id, body) {
    const {text, status} = body;

    await db('todos')
      .select()
      .where('id', id)
      .update({text, status})
      .returning('*');
  }
}

module.exports = new todosController();
