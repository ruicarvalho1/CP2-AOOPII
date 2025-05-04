import Movies from '../Models/moviesModel.js';
import mongoose from 'mongoose';

export const getMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';

        //Search by title
        const searchQuery = search
            ? { title: { $regex: search, $options: 'i' } }
            : {};

        const movies = await Movies.find(searchQuery).skip(skip).limit(limit);
        const total = await Movies.countDocuments(searchQuery);

        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this page' });
        }

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            count: movies.length,
            totalMovies: total,
            movies
        });
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

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const updatedMovie = await Movies.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (err) {
        res.status(500).json({ message: 'Error updating movie', error: err.message });
    }
};

/* Advanced aggregation queries */

export const getTopMoviesByGenre = async (req, res) => {
    try {
        const genre = req.query.genre;
        if (!genre) {
            return res.status(400).json({ message: 'Genre query parameter is required' });
        }

        const movies = await Movies.find({
            genres: genre,
            "imdb.rating": { $ne: null, $gt: 0 }
        })
            .sort({ "imdb.rating": -1 })
            .limit(5)
            .select('title year genres imdb.rating poster');


        if (movies.length === 0) {
            return res.status(404).json({ message: `No movies found for genre: ${genre}` });
        }

        const formatted = movies.map(movie => ({
            title: movie.title,
            year: movie.year,
            rating: movie.imdb?.rating,
            genres: movie.genres,
            poster: movie.poster
        }));

        res.status(200).json({
            genre,
            count: formatted.length,
            movies: formatted
        });

    } catch (err) {
        res.status(500).json({ message: 'Error fetching top movies for genre', error: err.message });
    }
};
