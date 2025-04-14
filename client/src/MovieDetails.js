import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://cp2-aoopii.onrender.com/auth/movies/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to load movie');
                }

                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error('Error loading movie:', err);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`https://cp2-aoopii.onrender.com/auth/movies/${id}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to load comments');
                }

                const data = await response.json();
                setComments(data);
            } catch (err) {
                console.error('Error loading comments:', err);
            }
        };

        fetchMovie();
        fetchComments();
    }, [id]);


    if (!movie) {
        return <p>Loading...</p>;
    }

    const tomatoes = movie.tomatoes || {};
    const criticRating = tomatoes.critic ? tomatoes.critic.meter : 'N/A';
    const boxOffice = tomatoes.boxOffice || 'Not available';
    const website = tomatoes.website || '#';

    return (
        <div className="movie-detail-container">
            <div className="movie-header">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                </div>
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p><strong>Year:</strong> {movie.year}</p>
                    <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                    <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                    <p><strong>Directors:</strong> {movie.directors.join(', ')}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdb.rating}</p>
                    <p><strong>Summary:</strong> {movie.fullplot}</p>
                    <p><strong>Critic Tomatoes:</strong> {criticRating}%</p>
                    <p><strong>Box Office:</strong> {boxOffice}</p>
                    <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
                    <p><strong>Awards:</strong> {movie.awards.text}</p>
                    <p><strong>Metacritic:</strong> {movie.metacritic}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Languages:</strong> {movie.languages.join(', ')}</p>
                    <p><strong>Countries:</strong> {movie.countries.join(', ')}</p>
                    <p><strong>Release Date:</strong> {new Date(movie.released).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="movie-plot">
                <h2>Full Plot</h2>
                <p>{movie.plot}</p>
            </div>

            <div className="comments-section">
                <h2>Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul className="comments-list">
                        {comments.map((comment, index) => (
                            <li key={index} className="comment">
                                <p>{comment.text}</p>
                                <small>{new Date(comment.date).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
