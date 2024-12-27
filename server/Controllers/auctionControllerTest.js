import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import Auction from './models/auction';
import dotenv from 'dotenv';

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

class AuctionInstance {
    constructor(auction_id) {
        this.auction_id = auction_id;
        this.auction_visible = false;
        this.auction_ended = false;
        this.auction_winner = '';
        this.auction_participants = [];
        this.bids = [];
        this.highest_bid = 0;
        this.highest_bidder = '';
    }

    updateBid(user_id, bid_value) {
        if (bid_value > this.highest_bid) {
            this.highest_bid = bid_value;
            this.highest_bidder = user_id;
            this.bids.push({ user_id, bid_value, date: Date.now() });
        }
    }

    async finalize() {
        const auction = await Auction.findOne({ auction_id: this.auction_id });
        if (auction) {
            auction.internal_info.auction_ended = this.auction_ended;
            auction.internal_info.auction_winner = this.auction_winner;
            auction.internal_info.auction_participants = this.auction_participants;
            auction.internal_info.bids = this.bids;
            auction.prices.auction_end_value = this.highest_bid;
            await auction.save();
        }
    }
}

const activeAuctions = {};

function verifyAdminJWT(token) {
    try {
        const decoded = jwt.verify(token, jwtsecret);
        if (decoded.role !== 'admin') {
            throw new Error('Apenas administradores podem acessar este servidor.');
        }
        return decoded;
    } catch (error) {
        throw new Error('Token inválido ou expirado.');
    }
}

async function processBid(auction_id, user_id, bid, socket) {
    let auctionInstance = activeAuctions[auction_id];

    if (!auctionInstance) {
        auctionInstance = new AuctionInstance(auction_id);
        activeAuctions[auction_id] = auctionInstance;

        const auction = await Auction.findOne({ auction_id });
        if (auction) {
            auctionInstance.auction_visible = auction.internal_info.auction_visible;
            auctionInstance.auction_ended = auction.internal_info.auction_ended;
            auctionInstance.auction_winner = auction.internal_info.auction_winner;
            auctionInstance.auction_participants = auction.internal_info.auction_participants;
            auctionInstance.bids = auction.internal_info.bids;
            auctionInstance.highest_bid = auction.prices.auction_end_value;
            auctionInstance.highest_bidder = auction.internal_info.auction_winner;
        }
    }

    if (auctionInstance.auction_ended) {
        return socket.send(JSON.stringify({ type: 'error', message: 'O leilão já terminou' }));
    }

    auctionInstance.updateBid(user_id, bid);

    broadcastMessage({
        auction_id,
        highestBid: auctionInstance.highest_bid,
        highestBidder: auctionInstance.highest_bidder,
        auctionData: auctionInstance,
    });
}

function broadcastMessage(message) {
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

function handleAdminConnection(socket, req) {
    let token = req.headers['authorization'];
    if (!token) {
        socket.send(JSON.stringify({ type: 'error', message: 'Token necessário.' }));
        socket.close();
        return;
    }

    try {
        const adminData = verifyAdminJWT(token);
        console.log('Admin conectado:', adminData);

        socket.on('message', (message) => {
            const parsedMessage = JSON.parse(message);
            const { auction_id } = parsedMessage;

            let auctionInstance = activeAuctions[auction_id];
            if (auctionInstance) {
                auctionInstance.auction_ended = true;
                auctionInstance.auction_winner = auctionInstance.highest_bidder;
                auctionInstance.finalize();
            }
        });

        socket.on('close', () => {
            console.log('Admin desconectado.');
        });
    } catch (error) {
        socket.send(JSON.stringify({ type: 'error', message: error.message }));
        socket.close();
    }
}

function handleUserConnection(socket, req) {
    let token = req.headers['authorization'];
    if (!token) {
        socket.send(JSON.stringify({ type: 'error', message: 'Token necessário.' }));
        socket.close();
        return;
    }

    try {
        const userData = jwt.verify(token, jwtsecret);
        console.log('Usuário conectado:', userData);

        socket.on('message', (message) => {
            const parsedMessage = JSON.parse(message);
            const { auction_id, user_id, bid } = parsedMessage;

            processBid(auction_id, user_id, bid, socket);
        });

        socket.on('close', () => {
            console.log('Usuário desconectado.');
        });
    } catch (error) {
        socket.send(JSON.stringify({ type: 'error', message: error.message }));
        socket.close();
    }
}

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket, req) => {
    const url = req.url || '';

    if (url.includes('/admin')) {
        handleAdminConnection(socket, req);
    } else if (url.includes('/user')) {
        handleUserConnection(socket, req);
    } else {
        socket.send(JSON.stringify({ type: 'error', message: 'Acesso não permitido.' }));
        socket.close();
    }
});

console.log('Servidor WebSocket está rodando na porta 8080');

export {
    handleAdminConnection,
    handleUserConnection,
};
