const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; // Порт для сервера

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "react_bd"
});

// Подключение к базе данных
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database");
});

// Middleware для обработки CORS
app.use(cors());

// Роут для получения данных из базы данных
app.get('/posts', (req, res) => {
    const query = "SELECT * FROM posts";

    con.query(query, function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch posts' });
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
