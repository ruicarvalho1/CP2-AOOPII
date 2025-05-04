import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'JWT_SECRET_KEY', { expiresIn: '1d' });
};
