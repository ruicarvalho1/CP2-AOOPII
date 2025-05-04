import React, { useEffect, useState } from 'react';
import './Style/EditMovieModal.css';
import defaultPoster from '../assets/default.png';

const allGenres = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror',
    'Mystery', 'Romance', 'Thriller', 'Sci-Fi', 'Animation'
];

const EditMovieModal = ({ movie, isOpen, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        poster: '',
        genres: []
    });
    const [newGenre, setNewGenre] = useState('');

    useEffect(() => {
        if (movie) {
            setFormData({
                title: movie.title,
                year: movie.year,
                poster: movie.poster || '',
                genres: movie.genres || []
            });
        }
    }, [movie]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenreSelect = (e) => {
        const selected = e.target.value;
        if (!formData.genres.includes(selected)) {
            setFormData({ ...formData, genres: [...formData.genres, selected] });
        }
    };

    const handleAddNewGenre = () => {
        const trimmed = newGenre.trim();
        if (trimmed && !formData.genres.includes(trimmed)) {
            setFormData({ ...formData, genres: [...formData.genres, trimmed] });
        }
        setNewGenre('');
    };

    const removeGenre = (genre) => {
        setFormData({
            ...formData,
            genres: formData.genres.filter(g => g !== genre)
        });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload = {
                ...formData,
                poster: formData.poster.trim() === '' ? null : formData.poster.trim()
            };

            const response = await fetch(`http://localhost:3002/auth/movies/${movie._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Erro ao atualizar o filme');

            onUpdated();
            onClose();
        } catch (err) {
            console.error('Erro ao atualizar o filme:', err);
        }
    };


    if (!isOpen || !movie) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Filme</h2>

                <img
                    src={formData.poster || defaultPoster}
                    alt="Poster"
                    style={{
                        width: '100%',
                        borderRadius: '6px',
                        maxHeight: '200px',
                        objectFit: 'cover'
                    }}
                    onError={(e) => { e.target.src = defaultPoster; }}
                />

                <div className="form-group">
                    <label htmlFor="poster">URL do Poster</label>
                    <input
                        id="poster"
                        type="text"
                        name="poster"
                        value={formData.poster}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Ano</label>
                    <input
                        id="year"
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre-select">Selecionar Género</label>
                    <select id="genre-select" onChange={handleGenreSelect} defaultValue="">
                        <option value="" disabled>Selecionar género</option>
                        {allGenres.map((genre, i) => (
                            <option key={i} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <div className="genre-tags">
                    {formData.genres.map((genre, idx) => (
                        <span key={idx} className="genre-tag">
                        {genre}
                            <button onClick={() => removeGenre(genre)}>×</button>
                    </span>
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="newGenre">Adicionar Novo Género</label>
                    <input
                        id="newGenre"
                        type="text"
                        placeholder="Novo género"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNewGenre()}
                    />
                </div>

                <div className="modal-buttons">
                    <button onClick={handleUpdate}>Guardar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );

};

export default EditMovieModal;
