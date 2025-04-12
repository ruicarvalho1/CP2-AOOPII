import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:3002/auth/movies/${id}`);
                if (!response.ok) {
                    throw new Error('Falha ao carregar o filme');
                }

                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error('Erro ao carregar o filme:', err);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3002/auth/movies/${id}/comments`);
                if (!response.ok) {
                    throw new Error('Falha ao carregar os comentários');
                }

                const data = await response.json();
                setComments(data);
            } catch (err) {
                console.error('Erro ao carregar os comentários:', err);
            }
        };

        fetchMovie();
        fetchComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const newCommentObj = {
            text: newComment,
            movieId: id,
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch(`http://localhost:3002/auth/movies/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentObj),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar comentário');
            }

            setComments([...comments, newCommentObj]);
            setNewComment('');
        } catch (err) {
            console.error('Erro ao enviar comentário:', err);
        }
    };

    if (!movie) {
        return <p>Carregando...</p>;
    }


    const tomatoes = movie.tomatoes || {};
    const criticRating = tomatoes.critic ? tomatoes.critic.meter : 'N/A';
    const boxOffice = tomatoes.boxOffice || 'Não disponível';
    const website = tomatoes.website || '#';

    return (
        <div className="movie-detail-container">
            <div className="movie-header">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                </div>
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p><strong>Ano:</strong> {movie.year}</p>
                    <p><strong>Gêneros:</strong> {movie.genres.join(', ')}</p>
                    <p><strong>Elenco:</strong> {movie.cast.join(', ')}</p>
                    <p><strong>Diretores:</strong> {movie.directors.join(', ')}</p>
                    <p><strong>Classificação IMDb:</strong> {movie.imdb.rating}</p>
                    <p><strong>Resumo:</strong> {movie.fullplot}</p>
                    <p><strong>Tomates Críticos:</strong> {criticRating}%</p>
                    <p><strong>Box Office:</strong> {boxOffice}</p>
                    <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
                    <p><strong>Prêmios:</strong> {movie.awards.text}</p>
                    <p><strong>Metacritic:</strong> {movie.metacritic}</p>
                    <p><strong>Duração:</strong> {movie.runtime} minutos</p>
                    <p><strong>Línguas:</strong> {movie.languages.join(', ')}</p>
                    <p><strong>Países:</strong> {movie.countries.join(', ')}</p>
                    <p><strong>Data de lançamento:</strong> {new Date(movie.released).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="movie-plot">
                <h2>Resumo Completo</h2>
                <p>{movie.plot}</p>
            </div>

            <div className="comments-section">
                <h2>Comentários</h2>
                {comments.length === 0 ? (
                    <p>Sem comentários ainda.</p>
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
