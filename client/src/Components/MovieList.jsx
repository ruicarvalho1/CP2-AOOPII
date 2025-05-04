import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/MoviesList.css';
import defaultPoster from '../assets/default.png';
import EditMovieModal from './EditMovieModal';
import TopByGenre from './TopByGenre';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieToEdit, setMovieToEdit] = useState(null);

    const navigate = useNavigate();

    const handleAuthError = (status) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const openEditModal = (movie) => {
        setMovieToEdit(movie);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setMovieToEdit(null);
    };

    const fetchMovies = async (page = 1, query = '') => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found');

            const response = await fetch(
                `http://localhost:3002/auth/movies?page=${page}&search=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 401 || response.status === 403) return handleAuthError(response.status);
            if (!response.ok) throw new Error('Failed to load movies');

            const data = await response.json();
            setMovies(data.movies);
            setFilteredMovies(data.movies);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Error loading movies:', err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchMovies(currentPage, search);
    }, [currentPage, search]);

    useEffect(() => {
        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [search, movies]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="movies-list-container">
            <EditMovieModal
                movie={movieToEdit}
                isOpen={isModalOpen}
                onClose={closeEditModal}
                onUpdated={() => fetchMovies(currentPage, search)}
            />

            <div className="navbar">
                <div className="navbar-left">
                    <h1 className="navbar-title">🎬 Movies List</h1>
                </div>
                <div className="navbar-right">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Top 5 por género */}
            <TopByGenre />

            {/* Linha divisória */}
            <hr className="divider-line" />

            {/* Pesquisa, filmes e paginação */}
            <h2 className="section-title">🎬 All Movies</h2>

            <input
                type="text"
                className="search-bar"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />

            {filteredMovies.length === 0 ? (
                <p>No movies available</p>
            ) : (
                <div className="movies-grid">
                    {filteredMovies.map((movie) => (
                        <div key={movie._id} className="movie-card">
                            <img
                                src={movie.poster || defaultPoster}
                                alt={movie.title}
                                className="movie-poster"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultPoster;
                                }}
                            />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p><strong>Year:</strong> {movie.year}</p>
                                <div className="genres">
                                    {movie.genres.map((genre, idx) => (
                                        <span key={idx} className="genre-badge">{genre}</span>
                                    ))}
                                </div>
                                <div className="details-button-container">
                                    <Link to={`/movie/${movie._id}`} className="details-link">View Details</Link>
                                    <button className="details-link" onClick={() => openEditModal(movie)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
