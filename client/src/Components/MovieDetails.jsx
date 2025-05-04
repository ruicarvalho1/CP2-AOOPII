import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Style/MovieDetails.css';
import defaultPoster from "../assets/default.png";
import WeatherWidget from './WeatherWidget';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [totalCommentPages, setTotalCommentPages] = useState(1);
    const [user, setUser] = useState(null);
    const commentsPerPage = 5;
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchProfile(token);
        }
    }, [navigate]);

    const fetchWeatherByCountry = async (country) => {
        try {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(country)}&count=1`);
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) return;

            const { latitude, longitude } = geoData.results[0];

            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const weatherData = await weatherRes.json();

            setWeather(weatherData.current_weather);
        } catch (err) {
            console.error('Error fetching weather for country:', err);
        }
    };

    const fetchProfile = async (token) => {
        try {
            const response = await fetch('https://cp2-aoopii-2.onrender.com/auth/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401 || response.status === 403) return handleAuthError(response.status);
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setUser(data.user);
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
    };

    const handleAuthError = (status) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const fetchMovie = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://cp2-aoopii-2.onrender.com/auth/movies/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401 || response.status === 403) return handleAuthError(response.status);
            if (!response.ok) throw new Error('Failed to load movie');
            const data = await response.json();
            setMovie(data);
            if (data.countries && data.countries.length > 0) {
                fetchWeatherByCountry(data.countries[0]);
            }
        } catch (err) {
            console.error('Error loading movie:', err);
        }
    };

    const fetchComments = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://cp2-aoopii-2.onrender.com/auth/movies/${id}/comments?page=${page}&limit=${commentsPerPage}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401 || response.status === 403) return handleAuthError(response.status);
            if (!response.ok) throw new Error('Failed to load comments');
            const data = await response.json();
            setComments(Array.isArray(data.comments) ? data.comments : []);
            setTotalCommentPages(data.totalPages || 1);
        } catch (err) {
            console.error('Error loading comments:', err);
            setComments([]);
            setTotalCommentPages(1);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://cp2-aoopii-2.onrender.com/auth/movies/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: newComment })
            });
            if (response.status === 401 || response.status === 403) return handleAuthError(response.status);
            if (!response.ok) throw new Error('Failed to add comment');

            setNewComment('');
            setCurrentCommentPage(1);
            fetchComments(1);
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://cp2-aoopii-2.onrender.com/auth/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401 || response.status === 403) return handleAuthError(response.status);
            if (!response.ok) throw new Error('Failed to delete comment');

            fetchComments(currentCommentPage);
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    useEffect(() => {
        fetchComments(currentCommentPage);
    }, [id, currentCommentPage]);

    if (!movie) return <p>Loading movie...</p>;

    const tomatoes = movie.tomatoes || {};
    const criticRating = tomatoes?.critic?.meter ?? 'N/A';
    const boxOffice = tomatoes?.boxOffice || 'Not available';
    const website = tomatoes?.website || '#';

    return (
        <div className="movie-detail-container">

            {/* Movie info */}
            <div className="movie-header">
                <div className="movie-poster">
                    <img
                        src={movie.poster || defaultPoster}
                        alt={movie.title}
                        className="movie-poster"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultPoster;
                        }}
                    />
                    {movie?.countries?.length > 0 && (
                        <WeatherWidget country={movie.countries[0]} />
                    )}
                </div>
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p><strong>Year:</strong> {movie.year ?? 'N/A'}</p>
                    <p><strong>Genres:</strong> {movie.genres?.join(', ') || 'N/A'}</p>
                    <p><strong>Cast:</strong> {movie.cast?.join(', ') || 'N/A'}</p>
                    <p><strong>Directors:</strong> {movie.directors?.join(', ') || 'N/A'}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdb?.rating ?? 'N/A'}</p>
                    <p><strong>Summary:</strong> {movie.fullplot || 'N/A'}</p>
                    <p><strong>Critic Tomatoes:</strong> {criticRating}%</p>
                    <p><strong>Box Office:</strong> {boxOffice}</p>
                    <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
                    <p><strong>Awards:</strong> {movie.awards?.text || 'N/A'}</p>
                    <p><strong>Metacritic:</strong> {movie.metacritic ?? 'N/A'}</p>
                    <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</p>
                    <p><strong>Languages:</strong> {movie.languages?.join(', ') || 'N/A'}</p>
                    <p><strong>Countries:</strong> {movie.countries?.join(', ') || 'N/A'}</p>
                    <p><strong>Release Date:</strong> {movie.released ? new Date(movie.released).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            {/* Plot */}
            <div className="movie-plot">
                <h2>Full Plot</h2>
                <p>{movie.plot || 'No plot available.'}</p>
            </div>

            {/* Comments */}
            <div className="comments-section">
                <h2>🎥 Public Comments</h2>
                <div className="add-comment">
                    <textarea
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>

                {(!comments || comments.length === 0) ? (
                    <p className="no-comments">No comments yet. Be the first to share your opinion!</p>
                ) : (
                    <>
                        <div className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment._id} className="comment-box">
                                    <div className="comment-header">
                                        <span className="comment-user">{comment.username || comment.name || 'Anonymous Viewer'}</span>
                                        <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
                                    </div>
                                    <p className="comment-text">“{comment.text}”</p>
                                    <button className="delete-btn" onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                </div>
                            ))}
                        </div>

                        {totalCommentPages > 1 && (
                            <div className="pagination comments-pagination">
                                <button onClick={() => setCurrentCommentPage(p => p - 1)} disabled={currentCommentPage === 1}>«</button>
                                {Array.from({ length: totalCommentPages }, (_, i) => i + 1).map(pageNum => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentCommentPage(pageNum)}
                                        className={currentCommentPage === pageNum ? 'active' : ''}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                                <button onClick={() => setCurrentCommentPage(p => p + 1)} disabled={currentCommentPage === totalCommentPages}>»</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
