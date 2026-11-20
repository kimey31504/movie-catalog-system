const express = require('express');
const movieController = require('../controllers/movie');

const { verify, verifyAdmin } = require('../auth');

const router = express.Router();

router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);
router.get('/getMovies', verify, movieController.getMovies);
router.get('/getMovie/:id', verify, movieController.getMovieById);

module.exports = router;