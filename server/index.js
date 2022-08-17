const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeeDB',
})

// Create
app.post('/create', (req, res) => {
    const {name, age, country, job, wage} = req.body;
    
    db.query(
        'INSERT INTO employees (name, age, country, job, wage) VALUES (?, ?, ?, ?, ?)', 
        [name, age, country, job, wage],
        err => {
            if (err) res.send({error: true, err})
            else res.send({error: false})
        }
    );
})

// Read
app.get('/employees', (req, res) => {
    db.query('SELECT * from employees', (err, result) => {
        if (err) res.send({error: true, err})
        else res.send({error: false, result})
    })
})

// Update
app.put('/edit', (req, res) => {
    const {id, name, age, country, job, wage} = req.body;
    const query = 'UPDATE employees SET name=?, age=?, country=?, job=?, wage=? WHERE id=?;';
    
    db.query(query, [name, age, country, job, wage, id],
    err => {
        if (err) res.send(err)
        else db.query('SELECT * from employees',
        (_err, result) => {
            if (_err) res.send(_err)
            else res.send(result);
        })
    })
})

// Delete
app.delete('/remove/:id', (req, res) => {
    const {id} = req.params;
    db.query('DELETE FROM employees WHERE id = ?', 
    [id],
    err => {
        if (err) res.send({error: true, err})
        else {
            db.query('SELECT * from employees',
            (_err, result) => {
                if (_err) res.send({error: true, _err})
                else res.send({error: false, result});
            })
        }
    })
})

app.listen(3001, () => {
    console.log("The server is running on port 3001.")
})