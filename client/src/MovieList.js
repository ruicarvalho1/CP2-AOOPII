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
                    throw new Error('Falha ao carregar filmes');
                }

                const data = await response.json();
                setMovies(data.movies);
            } catch (err) {
                console.error('Erro ao carregar filmes:', err);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="movies-list-container">
            <h1>Lista de Filmes</h1>
            {movies.length === 0 ? (
                <p>Sem filmes disponíveis</p>
            ) : (
                <table className="movies-table">
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Ano</th>
                        <th>Gêneros</th>
                        <th>Detalhes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.genres.join(', ')}</td>
                            <td>
                                <Link to={`/movie/${movie._id}`} className="details-link">Ver Detalhes</Link>
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
