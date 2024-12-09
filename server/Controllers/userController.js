import User from '../Models/userModel.js';
import { verifyToken } from '../config/jwtConfig.js';


export const getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id).select('-auth.password'); // Não retornar a senha

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }


        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao recuperar o perfil', error: err.message });
    }
};
