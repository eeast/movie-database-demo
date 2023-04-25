const express = require('express');

const movies = require('./movies');
const add_movie = require('./add-movie');
const update_review = require('./update-review');

const app = express();

app.use('/movies', movies);
app.use('/add-movie', add_movie);
app.use('./update-review', update_review);

app.delete('/movie/:id', (id) => {
    
});

module.exports = app;