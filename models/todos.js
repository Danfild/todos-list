const db = require('../config/index');

class todosController {
  getTodos(params) {
    const {
      username,
      status,
      orders
    } = params;

    const page = Number(params.page) || 0;
    const limit = Number(params.limit) || 5;
    const offset = page * limit / limit + page;

    const query = db('todos')
      .select();

    if (username) {
      query.andWhere('username', username);
    }

    if (status) {
      query.where('status', status);
    }

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }

    if (orders) {
      const {field, predicate} = JSON.parse(orders);

      query.orderBy(field, predicate);
    }

    return query;
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

  getCount = async() => {
    const query = await db('todos')
      .count('id');

    const [{count}] = await query;

    return Number(count);
  };
}

module.exports = new todosController();
