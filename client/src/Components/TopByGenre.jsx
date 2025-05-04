import React, { useEffect, useState } from 'react';
import defaultPoster from '../assets/default.png';
import './Style/MoviesList.css';

const TopByGenre = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('Animation'); // valor por defeito
    const [topMovies, setTopMovies] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        if (selectedGenre) {
            fetchTopByGenre(selectedGenre);
        }
    }, [selectedGenre]);

    const fetchGenres = async () => {
        try {
            const res = await fetch('https://cp2-aoopii-2.onrender.com/auth/movies?page=1', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            const allGenres = [...new Set(data.movies.flatMap(m => m.genres || []))].sort();
            setGenres(allGenres);

            if (allGenres.includes('Animation')) {
                setSelectedGenre('Animation');
            } else if (allGenres.length > 0) {
                setSelectedGenre(allGenres[0]);
            }
        } catch (err) {
            console.error('Failed to load genres:', err);
        }
    };

    const fetchTopByGenre = async (genre) => {
        try {
            const res = await fetch(`https://cp2-aoopii-2.onrender.com/auth/movies/top-by-genre?genre=${genre}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setTopMovies(data.movies || []);
        } catch (err) {
            console.error('Failed to fetch top movies by genre:', err);
        }
    };

    const handleChange = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
    };

    return (
        <div>
            <h2 className="section-title">🎭 Top 5 Movies by Genre</h2>

            <select
                className="search-bar"
                value={selectedGenre}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
            >
                <option value="">Select a genre</option>
                {genres.map((g, i) => (
                    <option key={i} value={g}>{g}</option>
                ))}
            </select>

            {topMovies.length > 0 ? (
                <div className="movies-grid">
                    {topMovies.map((movie, idx) => (
                        <div key={idx} className="movie-card">
                            <img
                                src={movie.poster || defaultPoster}
                                alt={movie.title}
                                className="movie-poster"
                                onError={(e) => { e.target.src = defaultPoster }}
                            />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p><strong>Year:</strong> {movie.year}</p>
                                <p><strong>Rating:</strong> ⭐ {movie.rating ?? 'N/A'}</p>
                                <div className="genres">
                                    {movie.genres?.map((genre, gidx) => (
                                        <span key={gidx} className="genre-badge">{genre}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : selectedGenre && (
                <p>No top movies found for this genre.</p>
            )}
        </div>
    );
};

export default TopByGenre;
