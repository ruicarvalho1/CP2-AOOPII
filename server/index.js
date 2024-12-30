import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';

import authRoutes from './Routes/authRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Middleware CORS personalizado
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://project-assignment-2-27638-27628-27643.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'); // Cabeçalhos permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); // Permite o envio de cookies de autenticação

    // Para requisições preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next(); // Passa para o próximo middleware ou rota
});

// Middleware para análise de JSON
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Rotas
app.use('/auth', authRoutes);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
