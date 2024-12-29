import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import Auction from '../Models/auctionsModel.js';
import dotenv from 'dotenv';
import User from "../Models/userModel.js";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

// Função para autenticar o token da query string
function authenticateTokenFromUrl(req) {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);  // Extrai os parâmetros da URL
    const token = urlParams.get('token');  // Obtém o token como parâmetro

    if (!token) {
        throw new Error('Token não fornecido');
    }

    return jwt.verify(token, jwtsecret);  // Verifica o token usando o segredo
}

async function getUserDetailsById(id) {
    try {
        // Verifique o ID antes da consulta
        console.log(`Buscando utilizador com ID: ${id}`);

        // Consulta na base de dados para encontrar o utilizador
        const user = await User.findOne(
            { _id: id },
            { first_name: 1, last_name: 1, 'auth.role': 1 }
        );

        if (!user) {
            console.log(`Utilizador não encontrado com o ID: ${id}`);
            return null;
        }

        console.log(`Utilizador encontrado: ${user.first_name} ${user.last_name}`);
        console.log("Detalhes da base de dados:", user);

        // Preparando o retorno com os detalhes
        const result = {
            fullName: `${user.first_name} ${user.last_name}`,
            role: user.auth.role
        };

        // Verifique o resultado antes de retornar
        console.log(`Resultado retornado:`, result);

        return result;

    } catch (error) {
        console.error(`Erro ao buscar utilizador com ID ${id}:`, error);
        throw new Error('Erro ao buscar utilizador na base de dados');
    }
}

async function auctionStarted(auction_id) {
    try {
        const result = await Auction.updateOne(
            { _id: auction_id },
            { $set: { 'internal_info.auction_started': true } }
        );

        if (result.modifiedCount === 0) {
            console.log(`Leilão não encontrado ou não houve alteração: auction_id=${auction_id}`);
            return null;
        }

        console.log(`Leilão iniciado: auction_id=${auction_id}, auction_started=true`);
        return result;

    } catch (error) {
        console.error(`Erro ao iniciar leilão com ID ${auction_id}:`, error);
        throw new Error('Erro ao atualizar o leilão na base de dados');
    }
}

class AuctionInstance {
    constructor(auction_id) {
        this.auction_id = auction_id;
        this.date_auction_started = true,
            this.auction_visible = false;
        this.auction_ended = false;
        this.auction_winner = '';
        this.auction_participants = [];
        this.bids = []; // Array para armazenar todos os lances
        this.highest_bid = 0;
        this.highest_bidder = '';
        this.date_auction_started = null;
        this.date_auction_ended = null;
        this.auction_start_value = 0;

        console.log(`AuctionInstance criado para leilão: ${auction_id}`);
    }

    async updateBid(id, bid_value, server) {
        console.log(`Atualizando lance: user_id=${id}, bid_value=${bid_value}`);
        // Verificar se a oferta é maior que o maior lance atual
        if ((bid_value > this.highest_bid) && (bid_value > this.auction_start_value)) {
            this.highest_bid = bid_value;
            this.highest_bidder = id;
            this.bids.push({ user_id: id, bid_value, date: Date.now() });

            this.auction_participants.push({ _id_user: id, bid: bid_value });

            console.log(`Novo maior lance: highest_bid=${this.highest_bid}, highest_bidder=${this.highest_bidder}`);

            const actualListeners = await getUserDetailsById(id);

            if (actualListeners.role === "admin") {
                broadcastMessage(server, {
                    auction_id: this.auction_id,
                    highestBid: this.highest_bid,
                    highestBidder: this.highest_bidder,
                    highestBidderName: actualListeners.fullName,
                    auctionData: this,
                });
            } else {
                broadcastMessage(server, {
                    highestBid: this.highest_bid,
                    highestBidder: actualListeners.fullName,
                });
            }

        } else {
            console.log(`Lance inválido. O valor deve ser maior que o maior lance atual: current_highest_bid=${this.highest_bid}`);

            // Envia uma mensagem de erro para todos os clientes
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'error',
                        message: 'A oferta deve ser maior que o maior lance atual.',
                    }));
                }
            });
        }
    }

    async finalize() {
        console.log(`Finalizando leilão: auction_id=${this.auction_id}`);
        const auction = await Auction.findOne({ _id: this.auction_id });
        if (auction) {
            // Atualiza as informações internas
            auction.internal_info.auction_ended = true;  // Garante que o leilão é finalizado
            auction.internal_info.auction_winner = this.auction_winner || 'Nenhum vencedor';
            auction.internal_info.auction_participants = this.auction_participants;
            auction.internal_info.auction_visible = this.auction_visible;

            // Atualizar o preço do leilão
            auction.prices.auction_end_value = this.highest_bid || auction.prices.auction_end_value;

            // Preencher datas obrigatórias
            auction.dates.date_auction_started = auction.dates.date_auction_started || this.date_auction_started || Date.now();
            auction.dates.date_auction_ended = Date.now();

            console.log(`Salvando leilão com valores atualizados: auction_id=${this.auction_id}`);
            await auction.save(); // Salvar as alterações no banco de dados
            console.log(`Leilão finalizado e salvo: auction_id=${this.auction_id}`);
        } else {
            console.log(`Leilão não encontrado na base de dados: auction_id=${this.auction_id}`);
        }
    }
}

const activeAuctions = {};

async function initializeAuctionInstance(auction_id) {
    console.log(`Inicializando instância do leilão: auction_id=${auction_id}`);
    if (activeAuctions[auction_id]) {
        console.log(`Instância existente encontrada para o leilão: auction_id=${auction_id}`);
        return activeAuctions[auction_id];
    }

    const auctionInstance = new AuctionInstance(auction_id);
    activeAuctions[auction_id] = auctionInstance;

    const auction = await Auction.findOne({ _id: auction_id });
    if (auction) {
        console.log(`Dados carregados da base de dados para o leilão: auction_id=${auction_id}`);
        auctionInstance.auction_visible = auction.internal_info.auction_visible || false;
        auctionInstance.auction_ended = auction.internal_info.auction_ended || false;
        auctionInstance.auction_winner = auction.internal_info.auction_winner || '';
        auctionInstance.auction_participants = Array.isArray(auction.internal_info.auction_participants) ? auction.internal_info.auction_participants : [];
        auctionInstance.bids = Array.isArray(auction.internal_info.bids) ? auction.internal_info.bids : [];
        auctionInstance.highest_bid = auction.prices.auction_end_value || 0;
        auctionInstance.highest_bidder = auction.internal_info.auction_winner || '';
        auctionInstance.date_auction_started = auction.dates.date_auction_started || Date.now();
        auctionInstance.auction_start_value = auction.prices.auction_start_value || 0;
    } else {
        console.log(`Nenhum dado encontrado na base de dados para o leilão: auction_id=${auction_id}`);
        auctionInstance.date_auction_started = Date.now();
    }

    return auctionInstance;
}

function broadcastMessage(server, message) {
    console.log(`Enviando mensagem para todos os clientes: ${JSON.stringify(message)}`);
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

async function processBid(server, auction_id, id, bid, socket) {
    console.log(`Processando lance: auction_id=${auction_id}, user_id=${id}, bid=${bid}`);
    const auctionInstance = await initializeAuctionInstance(auction_id);

    if (auctionInstance.auction_ended) {
        console.log(`Leilão já finalizado: auction_id=${auction_id}`);
        return socket.send(JSON.stringify({ type: 'error', message: 'O leilão já terminou' }));
    }


    await auctionInstance.updateBid(id, bid, server); // Garantir que a atualização seja feita de forma assíncrona
}

function handleAdminDisconnection() {
    console.log('Admin desconectado. Finalizando leilões não finalizados.');
    Object.values(activeAuctions).forEach((auctionInstance) => {
        if (!auctionInstance.auction_ended) {
            console.log(`Finalizando leilão: auction_id=${auctionInstance.auction_id}`);
            auctionInstance.auction_winner = auctionInstance.highest_bidder;
            auctionInstance.finalize(); // Salva o leilão ao final
        }
    });
    console.log('Todos os leilões não finalizados foram finalizados.');
}

function handleAdminConnection(socket, server, decoded) {
    console.log(`Admin conectado: ${JSON.stringify(decoded)}`);
    socket.on('message', async (message) => {
        console.log(`Mensagem recebida do admin: ${message}`);
        const { auction_id } = JSON.parse(message);
        const auctionInstance = await initializeAuctionInstance(auction_id);

        await auctionStarted(auction_id);

    });

    socket.on('close', () => {
        console.log('Conexão do admin fechada.');
        handleAdminDisconnection(); // Ao desconectar, chama a função de desconexão do admin
    });
}

function handleUserConnection(socket, server, decoded) {
    console.log(`Utilizador conectado: ${JSON.stringify(decoded)}`);
    socket.on('message', (message) => {
        console.log(`Mensagem recebida do utilizador: ${message}`);
        const { auction_id, bid } = JSON.parse(message);
        console.log("Valores atuais do utilizador", decoded.id);
        processBid(server, auction_id, decoded.id, bid, socket);
    });
}

// Função para autenticar o token da URL
function handleConnection(socket, server, req) {
    console.log('Nova conexão recebida.');

    try {
        // Obtém o token da query string da URL
        const decoded = authenticateTokenFromUrl(req);
        console.log(`Token autenticado com sucesso: ${JSON.stringify(decoded)}`);

        if (req.url.includes('/admin')) {
            if (decoded.role !== 'admin') {
                console.log('Acesso negado. Apenas administradores podem acessar este endpoint.');
                throw new Error('Apenas administradores podem acessar este endpoint.');
            }
            handleAdminConnection(socket, server, decoded);
        } else if (req.url.includes('/user')) {
            handleUserConnection(socket, server, decoded);
        } else {
            console.log(`Endpoint não permitido: ${req.url}`);
            socket.send(JSON.stringify({ type: 'error', message: 'Endpoint não permitido.' }));
            socket.close();
        }
    } catch (error) {
        console.log(`Erro ao autenticar token: ${error.message}`);
        socket.send(JSON.stringify({ type: 'error', message: error.message }));
        socket.close();
    }
}

// Cria o servidor WebSocket e define o manipulador de conexões
const server = new WebSocketServer({
    port: 8080,
    verifyClient: (info, callback) => {
        const allowedOrigins = ['http://localhost:5173','undefined','*','*:*']; // Adicione os domínios permitidos aqui
        const origin = info.origin || '*';

        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(true); // Permite a conexão
        } else {
            console.log(`Acesso negado para origem: ${origin}`);
            callback(false, 403, 'Acesso negado'); // Bloqueia a conexão com código 403
        }
    }
});

server.on('connection', (socket, req) => handleConnection(socket, server, req));

console.log('Servidor WebSocket está a correr na porta 8080');

export {
    handleAdminConnection,
    handleUserConnection,
};