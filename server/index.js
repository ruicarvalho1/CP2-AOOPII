import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import authRoutes from './Routes/authRoutes.js';
import { handleConnection } from './Controllers/auctionController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(cors({
    origin: 'https://project-assignment-2-27638-27628-27643.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/auth', authRoutes);

console.log("Configurando WebSocket...");

const wss = new WebSocketServer({
    server,
    path: '/ws/auction/live',
    verifyClient: (info, callback) => {
        console.log(`Tentativa de conexão WebSocket detectada.`);
        console.log(`Origem: ${info.origin}`);
        console.log(`Caminho: ${info.req?.url || 'Desconhecido'}`);
        callback(true); // Permitir todas as conexões
        console.log("Conexão permitida pelo verifyClient.");
    },
});

console.log("WebSocketServer configurado com sucesso.");

wss.on('connection', (socket, req) => {
    console.log("Evento de conexão WebSocket disparado.");
    console.log(`Nova conexão recebida.`);
    console.log(`Origem: ${req.headers.origin || 'Desconhecida'}`);
    console.log(`Endereço remoto: ${req.socket.remoteAddress || 'Desconhecido'}`);

    console.log("Chamando handleConnection...");
    handleConnection(socket, wss, req);
    console.log("handleConnection executado com sucesso.");
});

wss.on('error', (err) => {
    console.error("Erro no WebSocketServer:", err);
});

wss.on('close', () => {
    console.log("WebSocketServer encerrado.");
});

console.log("Eventos do WebSocketServer configurados.");

server.listen(port, () => {
    console.log(`Servidor HTTP disponível em: https://project-assignment-2-27638-27628-27643-3dd5.onrender.com`);
    console.log(`WebSockets disponíveis em: wss://project-assignment-2-27638-27628-27643-3dd5.onrender.com/ws/auction/live`);
});

// Cliente WebSocket
const socket = new WebSocket('wss://project-assignment-2-27638-27628-27643-3dd5.onrender.com/ws/auction/live');

socket.addEventListener('open', (event) => {
    console.log('Conexão WebSocket aberta:', event);
});

socket.addEventListener('error', (error) => {
    console.log('Erro na conexão WebSocket:', error);
});

socket.addEventListener('close', () => {
    console.log('Conexão WebSocket fechada');
});
