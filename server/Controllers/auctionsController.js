import { verifyToken } from "../Config/jwtConfig.js";
import Auctions from "../Models/auctionsModel.js";


export const getAuctions = async (req, res) => {
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


export const createAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const { banner_image, product_name, description, auction_start_value, auction_ended } = req.body;

        const newAuction = new Auctions({
            banner_image,
            product_name,
            description,
            auction_start_value,
            auction_ended: auction_ended || false,
            created_by: decoded.id,
        });

        await newAuction.save();

        res.status(201).json({ message: 'Leilão criado com sucesso', auction: newAuction });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar o leilão', error: err.message });
    }
};


export const updateAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const auction = await Auctions.findById(req.params.id);

        if (!auction) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }

        const { banner_image, product_name, description, auction_ended } = req.body;

        auction.banner_image = banner_image;
        auction.product_name = product_name;
        auction.description = description;
        auction.auction_ended = auction_ended;

        await auction.save();

        res.json({ message: 'Leilão atualizado com sucesso', auction });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar o leilão', error: err.message });
    }
};


export const deleteAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const auction = await Auctions.findById(req.params.id);

        if (!auction) {
            return res.status(404).json({ message: 'Leilão não encontrado' });
        }

        if (auction.created_by.toString() !== decoded.id) {
            return res.status(403).json({ message: 'Não tem permissão para excluir este leilão' });
        }

        await auction.remove();

        res.json({ message: 'Leilão removido com sucesso' });

    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover o leilão', error: err.message });
    }
};
