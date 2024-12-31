import User from '../Models/userModel.js';
import { verifyToken } from '../config/jwtConfig.js';


export const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id).select('-auth.password');

        if (!user) {
            return res.status(404).json({ message: 'User não encontrado' });
        }


        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao encontrar o perfil', error: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ message: 'Erro no Token' });
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User não encontrado' });
        }

        const {first_name, last_name, email, username,image_profile ,credit_card } = req.body;

        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.username = username;
        user.image_profile = image_profile;
        user.credit_card = credit_card;

        await user.save();

        res.json({ message: 'Perfil atualizado com sucesso', user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar o perfil', error: err.message });
    }
}
