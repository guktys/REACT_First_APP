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
app.get('/posts/:postid', (req, res) => {
    const postId = req.params.postid;
    const query = `SELECT * FROM posts WHERE id = '${postId}';`;

    con.query(query, function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch posts' });
        } else {
            //const post = result[0]; // Получить первый элемент из массива результатов
            res.json(result);
        }
    });
});
app.get('/getComm/:postid', (req, res) => {
    const postId = req.params.postid;
    const query = `SELECT * FROM  comment  WHERE post  = '${postId}';`;

    con.query(query, function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch posts' });
        } else {
            //const post = result[0]; // Получить первый элемент из массива результатов
            res.json(result);
        }
    });
});
// Middleware для обработки JSON данных
app.use(express.json());

// Роут для добавления комментария
app.post('/addComment', (req, res) => {
    // Извлекаем данные из тела запроса
    const { author, content, post,title } = req.body;

    // Создаем текущую дату в нужном формате
    const currentDate = new Date().toISOString().slice(0, 10);

    // Создаем параметризованный SQL-запрос
    const query = "INSERT INTO `comment` (`id`, `title`, `text`, `author`, `date`, `post`) VALUES (NULL, ?, ?, ?, ?, ?)";

    // Выполняем запрос с использованием параметров
    con.query(query, [title, content, author, currentDate, post], function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to add comment' });
        } else {
            res.json({ message: 'Comment added successfully' });
        }
    });
});
app.post('/deleteComment', (req, res) => {
// Извлекаем данные из тела запроса
    const { id } = req.body;
    const query = `DELETE FROM comment WHERE id = ${id}`;

// Выполняем запрос
    con.query(query, function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete comment' });
        } else {
            res.json({ message: 'Comment deleted successfully' });
        }
    });
});

app.post('/updateComment', (req, res) => {
    // Извлекаем данные из тела запроса
    const { author, content, comm_id, title } = req.body;

    const query = "UPDATE `comment` SET `title` = ?, `text` = ? WHERE `id` = ?";

    // Выполняем запрос с использованием параметров
    con.query(query, [title, content, comm_id], function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update comment' });
        } else {
            res.json({ message: 'Comment updated successfully' });
        }
    });
});

app.get('/kategoris', (req, res) => {
    const query = "SELECT DISTINCT name FROM kategoria";

    con.query(query, function (err, result, fields) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch categories' });
        } else {
            res.json(result);
        }
    });
});
app.get('/kategoria_select/:name', (req, res) => {
    const name = req.params.name;
    const query = `SELECT * FROM posts WHERE kategoria = '${name}';`;

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
