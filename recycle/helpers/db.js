const mysql = require('mysql2');

class DB {
    constructor() {
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'H#>NudLFmn1G+^[eTJs+',
                database: 'movies_db'
            },
            console.log(`Connected to the movies_db database.`)
        );
    };

    getMovies = function() {
        this.db.query('SELECT * FROM movies', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return results;
            }
        })
    };

    addMovie = function(movieName) {
        this.db.query('INSERT INTO movies (movie_name) VALUES (?)', movieName, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return results;
            }
        });
    };

    removeMovie = function(movieID) {
        this.db.query('DELETE FROM movies WHERE id=?', movieID, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return results;
            }
        });
    }

    getReviews = function() {
        this.db.query('SELECT * FROM reviews JOIN movies ON reviews.movie_id = movies.id', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return results;
            }
        })
    }
};

module.exports = DB;