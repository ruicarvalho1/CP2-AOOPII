import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const protect = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth && auth.startsWith('Bearer')) {
        try {
            const token = auth.split(' ')[1];
            const decoded = jwt.verify(token, 'JWT_SECRET_KEY');

            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = {
                id: user._id,
                username: user.username,
            };

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};
