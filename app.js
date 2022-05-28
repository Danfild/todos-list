require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/index');
const PORT = process.env.PORT || 5000;

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/', require('./routes/todos.routes'));

start = async() => {
  try {
    const {rows: connectToDb} = await db.context.raw(`SELECT NOW()`);

    app.listen(PORT, () => console.log(
      `Started server on ${PORT} and has a connection to the database ${connectToDb[0].now}`
    ));
  } catch(e) {
    console.log('Server Erorr:', e.message);
  }
};

start();