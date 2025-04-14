import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesList.css';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 10;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://cp2-aoopii-2.onrender.com/auth/movies');
                if (!response.ok) throw new Error('Failed to load movies');
                const data = await response.json();
                setMovies(data.movies);
                setFilteredMovies(data.movies);
            } catch (err) {
                console.error('Error loading movies:', err);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMovies(filtered);
        setCurrentPage(1); // reset to first page when searching
    }, [search, movies]);

    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="movies-list-container">
            <h1>Movies List</h1>

            <input
                type="text"
                className="search-bar"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {currentMovies.length === 0 ? (
                <p>No movies available</p>
            ) : (
                <table className="movies-table">
                    <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Genres</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentMovies.map((movie) => (
                        <tr key={movie._id}>
                            <td>
                                <img src={movie.poster} alt={movie.title} style={{ width: '50px' }} />
                            </td>
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

            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>«</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(pageNum => {
                            const start = Math.max(currentPage - 5, 1);
                            const end = Math.min(start + 9, totalPages);
                            return pageNum >= start && pageNum <= end;
                        })
                        .map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={currentPage === pageNum ? 'active' : ''}
                            >
                                {pageNum}
                            </button>
                        ))}
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
                </div>
            )}
        </div>
    );
};

export default MoviesList;
