/**import { WebSocketServer } from 'ws';
//import { encryptId, decryptId } from '../middlewares/encryptDecryptData.js';
import { z } from 'zod';

const auctionRooms = new Map();
//const objectMongoRegex = /^[a-fA-F0-9]{24}$/;
//const hexadecimalRegex = /^[0-9a-fA-F]+$/;

/*
auctionRooms.set(auctionId, {
    participants: [], // Lista de participantes (com WebSocket)
    data: { // Dados do leilão
        internal_info: {
            auction_participants: [] // Participantes do leilão com suas ofertas
        },
        dates: {
            date_auction_created: 0,
            date_auction_started: 0,
            date_auction_ended: 0,
        },
        prices: {
            auction_start_value: 0,
            auction_end_value: 0,
        }
    },
    timeout: null, // Temporizador para encerrar o leilão
});
*/

const auctionSchema = z.object({
    internal_info: z.object({
        auction_visible: z.boolean().default(false),
        auction_ended: z.boolean().default(false),
        auction_winner: z.string().default(''),
        auction_participants: z.array(
            z.object({
                _id_user: z.string(),
                bid: z.number().default(0),
            })
        ),
    }),
    dates: z.object({
        date_auction_created: z.number().default(0),
        date_auction_started: z.number().default(0),
        date_auction_ended: z.number().default(0),
    }),
    prices: z.object({
        auction_start_value: z.number().default(0),
        auction_end_value: z.number().default(0),
    }),
});

/**
const AuctionGetNewBidSchema = (minBidValue) => {
    return z.object({
        auction_id: z.string().regex(objectMongoRegex, 'Invalid auction ID'),
        user_id: z.string().regex(objectMongoRegex, 'Invalid user ID'),
        bid: z.number().min(minBidValue, { message: `Bid must be at least ${minBidValue}` }),
    });
};

const AuctionSendBidSchema = (minBidValue) => {
    return z.object({
        auction_id: z.string().regex(hexadecimalRegex, 'Invalid auction ID'),
        user_id: z.string().regex(hexadecimalRegex, 'Invalid user ID'),
        bid: z.number().min(minBidValue, { message: `Bid must be at least ${minBidValue}` }),
    });
};
    ///



const AuctionGetNewBidSchema = (minBidValue) => {
    return z.object({
        auction_id: z.string(),
        user_id: z.string(),
        bid: z.number().min(minBidValue, { message: `Bid must be at least ${minBidValue}` }),
    });
};

const AuctionSendBidSchema = (minBidValue) => {
    return z.object({
        auction_id: z.string(),
        user_id: z.string(),
        bid: z.number().min(minBidValue, { message: `Bid must be at least ${minBidValue}` }),
    });
};


const initializeSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        handleConnection(ws);
    });

    return wss;
};

const handleConnection = (ws) => {
    console.log('New client connected');
    ws.send('WebSocket connected successfully!');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'join') {
                const auctionId = (data.auction_id);
                const userId = (data.user_id);
                joinAuctionRoom(auctionId, userId, ws);
            }

            if (data.type === 'bid') {
                const decryptedData = {
                    auction_id: (data.auction_id),
                    user_id: (data.user_id),
                    bid: data.bid,
                };
                await handleNewBid(ws, decryptedData);
            }
        } catch (err) {
            console.error('Error processing message:', err.message);
            ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
};

const joinAuctionRoom = (auctionId, userId, ws) => {
    if (!auctionRooms.has(auctionId)) {
        auctionRooms.set(auctionId, {
            participants: [],
            data: {
                internal_info: { auction_participants: [] },
            },
            timeout: null,
        });
    }

    const room = auctionRooms.get(auctionId);


    const existingParticipant = room.participants.find(p => p.userId === userId);
    if (existingParticipant) {

        existingParticipant.ws = ws;
        ws.send(JSON.stringify({ message: `Reconnected to auction ${auctionId}` }));
        console.log(`User ${userId} reconnected to auction ${auctionId}`);
    } else {
        room.participants.push({ userId, ws });
        ws.send(JSON.stringify({ message: `Welcome to auction ${auctionId}` }));
        console.log(`User ${userId} joined auction ${auctionId}`);
    }
};

const handleNewBid = async (ws, decryptedData) => {
    const { auction_id, user_id, bid } = decryptedData;

    const minBidValue = 10;
    const schema = AuctionGetNewBidSchema(minBidValue);
    schema.parse(decryptedData);

    const room = auctionRooms.get(auction_id);
    if (room) {

        const participant = room.data.internal_info.auction_participants.find(p => p._id_user === user_id);
        if (participant) {
            participant.bid = bid;
        } else {
            room.data.internal_info.auction_participants.push({ _id_user: user_id, bid });
        }


        if (room.timeout) clearTimeout(room.timeout);
        room.timeout = setTimeout(() => endAuction(auction_id), 20000);

        console.log(`New bid received for auction ${auction_id}:`, { user_id, bid });
        broadcastToRoom(auction_id, JSON.stringify({ bid, user_id }));
    }
};

const broadcastToRoom = (auctionId, message) => {
    const room = auctionRooms.get(auctionId);
    if (!room) {
        console.error(`No room found for auction ${auctionId}`);
        return;
    }

    let encryptedMessage = message;
    try {

        let messageData = JSON.parse(message);
        if (messageData.user_id) {
            messageData.user_id = (messageData.user_id);
        }
        if (messageData.auction_id) {
            messageData.auction_id = (messageData.auction_id);
        }

        encryptedMessage = JSON.stringify(messageData);
    } catch (err) {
        console.error('Error encrypting message:', err.message);
    }

    room.participants.forEach(({ ws }) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(encryptedMessage);
        }
    });
    console.log(`Message sent to all participants in auction ${auctionId}`);
};


const endAuction = (auctionId) => {
    const room = auctionRooms.get(auctionId);
    if (!room) return;

    const participants = room.data.internal_info.auction_participants;
    const winner = participants.length > 0 ? participants[participants.length - 1] : null;

    if (winner) {
        room.data.internal_info.auction_winner = winner._id_user;
        console.log(`Auction ${auctionId} ended. Winner:`, winner);
    } else {
        console.log(`Auction ${auctionId} ended with no participants.`);
    }

    room.data.internal_info.auction_ended = true;
    room.data.dates.date_auction_ended = Date.now();

    validateAndSaveAuctionData(auctionId);
};

const validateAndSaveAuctionData = (auctionId) => {
    const room = auctionRooms.get(auctionId);
    if (!room) return;

    try {
        auctionSchema.parse(room.data);
        console.log(`Auction ${auctionId} data validated and saved:`, room.data);
        auctionRooms.delete(auctionId);
    } catch (err) {
        console.error(`Validation failed for auction ${auctionId}:`, err.errors);
    }
};

export { initializeSocket };
**/