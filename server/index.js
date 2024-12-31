import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { WebSocketServer } from 'ws';
import authRoutes from './Routes/authRoutes.js';
import { handleAdminConnection, handleUserConnection } from './Controllers/auctionController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// Middleware para JSON
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas REST
app.use('/auth', authRoutes);

// Configuração do WebSocket
const wss = new WebSocketServer({
    server,
    path: '/ws/auction/live', // Caminho relativo para WebSocket
    verifyClient: (info, callback) => {
        console.log('Verificando origem do cliente:', info.origin); // Depuração
        callback(true); // Permite todas as origens
    }
});

wss.on('connection', (socket, req) => {
    console.log('Nova conexão WebSocket recebida:', req.url); // Depuração da URL de conexão
    const url = req.url || '';
    if (url.includes('admin')) {
        console.log('Conexão admin identificada.');
        handleAdminConnection(socket, wss, req);
    } else if (url.includes('user')) {
        console.log('Conexão user identificada.');
        handleUserConnection(socket, wss, req);
    } else {
        console.log('Conexão WebSocket sem tipo especificado');
        socket.close(); // Fecha a conexão se não é reconhecida
    }
});

// Inicia o servidor HTTP
server.listen(port, () => {
    console.log(`Servidor HTTP disponível em: https://project-assignment-2-27638-27628-27643-3dd5.onrender.com`);
    console.log(`WebSockets disponíveis em: wss://project-assignment-2-27638-27628-27643-3dd5.onrender.com/ws/auction/live`);
});
