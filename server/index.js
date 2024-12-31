import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { WebSocketServer } from 'ws';
import authRoutes from './Routes/authRoutes.js';
import {handleConnection } from './Controllers/auctionController.js';

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

console.log("A entrar no const wss");



const wss = new WebSocketServer({
    server,
    path: '/ws/auction/live',
    verifyClient: (info, callback) => {
        console.log(`Conexão recebida de origem: ${info.origin}`);
        callback(true); // Permite todas as origens
    },
});

console.log("wss instancia")

wss.on('connection', (socket, req) => {
    console.log(`Nova conexão recebida de: ${req.headers['origin'] || 'Desconhecida'}`);
    handleConnection(socket, wss, req); // Usar o handler centralizado
});


// Inicia o servidor HTTP
server.listen(port, () => {
    console.log(`Servidor HTTP disponível em: https://project-assignment-2-27638-27628-27643-3dd5.onrender.com`);
    console.log(`WebSockets disponíveis em: wss://project-assignment-2-27638-27628-27643-3dd5.onrender.com/ws/auction/live`);
});
