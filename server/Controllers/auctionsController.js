import { verifyToken } from "../Config/jwtConfig.js";
import Auctions from "../Models/auctionsModel.js";


export const getAuctionsAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const auctions = await Auctions.find();

        if (!auctions || auctions.length === 0) {
            return res.status(404).json({ message: 'Leilões não encontrados' });
        }

        res.json({ auctions });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao encontrar os leilões', error: err.message });
    }
};

export const getAuctionsUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);


        const auctions = await Auctions.find({ 'internal_info.auction_ended': { $ne: true } });

        if (!auctions || auctions.length === 0) {
            return res.status(404).json({ message: 'Leilões não encontrados' });
        }

        res.json({ auctions });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao encontrar os leilões', error: err.message });
    }
};

export const getAuctionById = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const auctionId = req.params.id;

        const auction = await Auctions.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }

        res.json({ auction });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao encontrar o leilão', error: err.message });
    }
};


export const createAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const {
            banner_image,
            product_name,
            description,
            start_price,
            is_visible,
            start_date
        } = req.body;

        const newAuction = new Auctions({
            banner_image,
            product_name,
            description,
            prices: {
                auction_start_value: start_price,
            },
            internal_info: {
                auction_visible: is_visible,
            },
            dates: {
                date_auction_started: start_date,
                date_auction_created: Date.now(),
            },
            created_by: decoded.id,
        });

        await newAuction.save();

        res.status(201).json({ message: 'Leilão criado com sucesso', auction: newAuction });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar o leilão', error: err.message });
    }
};



export const getHistoryAuctions = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const decoded = verifyToken(token);
        console.log('Token Decodificado:', decoded);

        if (!decoded) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }

        const auctions = [];

        try {

            const completedAuctions = await Auctions.find({
                'internal_info.auction_winner': decoded.id,
                'internal_info.auction_visible': true,
                'internal_info.auction_ended': true
            });

            auctions.push(...completedAuctions);

            console.log('Leilões encontrados:', auctions);

        } catch (err) {
            console.error("Erro ao buscar os leilões:", err);
            return res.status(500).json({ message: 'Erro ao encontrar o histórico dos leilões', error: err.message });
        }

        if (!auctions || auctions.length === 0) {
            return res.status(404).json({ message: 'Histórico dos leilões não foi encontrado' });
        }

        res.json({ auctions });
    } catch (err) {
        console.error("Erro ao buscar os leilões:", err);
        res.status(500).json({ message: 'Erro ao encontrar o histórico dos leilões', error: err.message });
    }
};




export const updateAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);
        console.log('Token Decodificado:', decoded);

        const auction = await Auctions.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }

        const {
            banner_image,
            product_name,
            description,
            start_date,
            internal_info,
            prices
        } = req.body;

        console.log('Dados recebidos:', req.body);


        const startDateTimestamp = start_date ? new Date(start_date).getTime() : auction.start_date;

        auction.banner_image = banner_image || auction.banner_image;
        auction.product_name = product_name || auction.product_name;
        auction.description = description || auction.description;
        auction.start_date = startDateTimestamp;

        if (internal_info?.auction_visible !== undefined) {
            auction.internal_info.auction_visible = internal_info.auction_visible;
        }

        if (prices) {
            if (prices.auction_start_value !== undefined) {
                auction.prices.auction_start_value = prices.auction_start_value;
            }
            if (prices.auction_end_value !== undefined) {
                auction.prices.auction_end_value = prices.auction_end_value;
            }
        }


        await auction.save();
        console.log('Leilão atualizado:', auction);

        res.json({ message: 'Leilão atualizado com sucesso', auction });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar o leilão', error: err.message });
    }
};




export const deleteAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }


        const auction = await Auctions.findById(req.params.id);

        if (!auction) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }

        await Auctions.deleteOne({ _id: req.params.id });

        res.json({ message: 'Leilão removido com sucesso' });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover o leilão', error: err.message });
    }
};




