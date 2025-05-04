import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MoviesList from './Components/MovieList';
import MovieDetails from './Components/MovieDetails';
import Login from './Components/Login';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />

                <Route
                    path="/"
                    element={user ? <MoviesList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/movie/:id"
                    element={user ? <MovieDetails /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
