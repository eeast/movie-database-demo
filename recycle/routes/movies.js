const util = require('util');
const movies = require('express').Router();
const DB = require('../helpers/db');

movies.get('/', (req, res) => {
    const db = new DB();
    const retrieve = util.promisify(db.getMovies);
    retrieve().then((results) => res.json(results));
});

module.exports = movies;