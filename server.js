const express = require('express');
const { clog } = require('./middleware/clog');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'H#>NudLFmn1G+^[eTJs+',
        database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
)

app.use(clog);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            console.log(err);
        }
        res.json(results);
    });
});

app.get('/api/reviews', (req, res) => {
    db.query('SELECT * FROM movies JOIN reviews ON movies.id = reviews.movie_id', (err, results) => {
        if (err) { 
            console.log(err);
        }
        res.json(results);
    });
});

app.post('/api/add-movie', (req, res) => {
    const data = req.body;
    
    if (req.body) {
        console.log(data);
        db.query('INSERT INTO movies (movie_name) VALUE (?)', data[0].title);
        db.query('SELECT * FROM movies', (err, results) => {
            if (err) {
                console.log(err);
            }
            res.json(results);
        });
    }
});

app.post('/api/add-review', (req, res) => {
    const data = req.body;
    
    if (req.body) {
        console.log(data);
        db.query('INSERT INTO reviews (movie_id, review) VALUES (?, ?)', [data[0].movie_id, data[0].review]);
        db.query('SELECT * FROM movies JOIN reviews ON movies.id = reviews.movie_id', (err, results) => {
            if (err) {
                console.log(err);
            }
            res.json(results);
        });
    }
});

app.delete('/api/movie/:id', id, (req, res) => {
    
})

app.get('/', (req, res) => {
    res.send("Please access the functions through /api/");
})

app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})