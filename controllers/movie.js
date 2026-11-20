const Movie = require('../models/Movie');

const { errorHandler } = require('../auth');

module.exports.addMovie = (req, res) => {
	let newMovie = new Movie({
		title: req.body.title,
		director: req.body.director,
		year: req.body.year,
		description: req.body.description,
		genre: req.body.genre
	});

	return newMovie.save()
	.then(result => res.status(201).send(result))
	.catch(error => errorHandler(error, req, res));
};

module.exports.getMovies = (req, res) => {
	return Movie.find({})
	.then(result => {
		if(result.length > 0){
			return res.status(200).send({ movies: result });
		} else {
			return res.status(404).send({ message: "No movies found" });
		}
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.getMovieById = (req, res) => {
	return Movie.findById(req.params.id)
	.then(result => {
		if(result){
			return res.status(200).send(result);
		} else {
			return res.status(404).send({ message: "Movie not found" });
		}
	})
	.catch(error => errorHandler(error, req, res));
};