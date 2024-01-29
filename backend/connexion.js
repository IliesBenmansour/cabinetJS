const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "cabinet"
});

// Check if there's an error connecting to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/users', (req, res) => {
    const sqlPatient = "SELECT * FROM patient";
    // Use the connection.query method
    db.query(sqlPatient, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.listen(5000, () => console.log("app is running"));
