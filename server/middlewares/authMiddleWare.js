import { verifyToken } from '../Config/jwtConfig.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};
