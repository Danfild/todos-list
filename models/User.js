const {pool: db} = require('../config');

class UserController {
    async createUser(params) {
        const {name, email, password} = params;

        return await db
            .query(
                `INSERT INTO users (userName, email, password) values ($1, $2, $3) RETURNING *`,
                [name, email, password]
            );
    }

    async getUser(params) {
        const {email} = params;

        return await db
            .query(
                `SELECT * FROM users WHERE email = $1::text`,
                [email]
            );
    }
}

module.exports = new UserController();