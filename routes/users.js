var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const { connect } = require('.');
const connection = mysql.createConnection({
  host: '192.168.1.129',
  user: 'root',
  password: '',
  database: 'rest_express'
})

/* GET users listing. */
router.get('/users', function(req, res, next) {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur MySQL :', err);
      return res.status(500).send({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
    
    res.status(200).json({ data: results });
  });
});

// Create user
router.post('/', function(req, res) {
  connection.connect();

  try{
    const data = req.body;
    const {name, email, password} = data;

    connection.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password]);

    res.status(200).json({
      message: "user created successfully"
    });
  }catch(error){
    res.status(500).json({
      message: "server error"
    })
  }
  finally{
    connection.end();
  }
  res.status(200).json({message : "user created successfully"});
});

// update user
router.put('/update/:id', function(req, res) {
  connection.connect();

  try{
    const {id} = req.params;
    const data = req.body;
    const {name, email, password} = req.body;

    connection.query('UPDATE users set name = ?, email = ?, password = ? where id = ?', [name, email, password, id]);

    res.status(200).json({message: "update successfully"});
  }catch(error){
    res.status(500).json({message: error});
  }
  finally{
    connection.end();
  }
});

// Delete user 
router.delete('/delete/:id', function(req, res) {
  connection.connect();

  try{
    const {id} = req.params;
    
    connection.query('DELETE from users where id = ?', [id]);

    res.status(200).json({message : "delete successfully"});
  }catch(error){
    res.status(500).json({message: error});
  }
  finally{
    connection.end();
  }
})


module.exports = router;
