import {verifyToken} from "../Config/jwtConfig.js";
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


export const updateAuction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const auction = await Auctions.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Auction não encontrado' });
        }

        const {banner_image, product_name, description, auction_ended } = req.body;

        auction.banner_image = banner_image;
        auction.product_name = product_name;
        auction.description = description;
        auction.auction_ended = auction_ended;

        await user.save();

        res.json({ message: 'Auction atualizado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar o Auction', error: err.message });
    }
}
