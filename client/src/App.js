import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesList from './MovieList';
import MovieDetails from './MovieDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MoviesList />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
