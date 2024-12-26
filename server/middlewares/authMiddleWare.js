import { verifyToken } from '../Config/jwtConfig.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso interdito, token não fornecido' });
    }

    try {
        const decoded = verifyToken(token);

        if (decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({ message: 'Token expirado' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

export const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acesso interdito. Permissão insuficiente.' });
        }

        next();
    };
};
