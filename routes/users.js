var express = require('express');
var router = express.Router();

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '192.168.1.129',
  user: 'root',
  password: '',
  database: 'rest_express'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create user
router.post('/', function(req, res) {
  connection.connect()

  const data = req.body;
  const {name, email, password} = data;

  connection.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password]);

  connection.end();

  res.status(200).json({message : "user created successfully"});
})


module.exports = router;
