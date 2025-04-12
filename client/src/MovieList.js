import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesList.css';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://cp2-aoopii.onrender.com/auth/movies');

                if (!response.ok) {
                    throw new Error('Failed to load movies');
                }

                const data = await response.json();
                setMovies(data.movies);
            } catch (err) {
                console.error('Error loading movies:', err);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="movies-list-container">
            <h1>Movies List</h1>
            {movies.length === 0 ? (
                <p>No movies available</p>
            ) : (
                <table className="movies-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Genres</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.genres.join(', ')}</td>
                            <td>
                                <Link to={`/movie/${movie._id}`} className="details-link">View Details</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MoviesList;
