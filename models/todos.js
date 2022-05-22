const {pool: db} = require('../config');

class todosController {
    async getTodos(params) {
        let {username, status, page, limit} = params;
        page = page || 1;
        limit = limit || 10;

        let offset = page * limit - limit;

        return await db
            .query(
                `SELECT * from todos 
                    WHERE username = $1::text`,
                [username]
            );
    }
}
// select * from todos where username = 'Daniel' and status = 'canceled' limit 5 offset 0
module.exports = new todosController();