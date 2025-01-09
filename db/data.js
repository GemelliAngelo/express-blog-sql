const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blog",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySql");
});

module.exports = connection;
