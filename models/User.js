const db = require('../config/index');

class UserController {
  async createUser(params) {
    await db('users')
      .insert(params)
      .returning(['username', 'email', 'password']);
  }

  async getUser(params) {
    const {email} = params;

    await db('users')
      .select('email')
      .whereIn('email', email)
      .returning('*');
  }
}

module.exports = new UserController();