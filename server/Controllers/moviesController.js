import Movies from '../Models/moviesModel.js';
import mongoose from 'mongoose';

export const getMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'title';
        const order = req.query.order === 'desc' ? -1 : 1;

        const movies = await Movies.find().sort({ [sortBy]: order }).skip(skip).limit(limit);

        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        res.status(200).json({ page, limit, count: movies.length, movies });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching movies', error: err.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const movie = await Movies.findById(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching movie', error: err.message });
    }
};