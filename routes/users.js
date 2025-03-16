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
    const dateNow = Date.now();

    let date_time = new Date(dateNow);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    // YYYY-MM-DD format
    let date_formated = year + "-" + month + "-" + date;

    connection.query('INSERT INTO users (name, email, password, created_at) VALUES (?,?,?,?)', [name, email, password, date_formated]);

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

    const dateNow = Date.now();

    let date_time = new Date(dateNow);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    // YYYY-MM-DD format
    let date_formated = year + "-" + month + "-" + date;

    connection.query('UPDATE users set name = ?, email = ?, password = ?, updated_at=? where id = ?', [name, email, password, date_formated,id]);

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
