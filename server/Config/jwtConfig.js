import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'dsajkhdjsakhdjashdjkashdjashdjashdjashdjkashdjkahsdjkahsdjashdjksahdkjhajkdhsa';


const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.auth.role,
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decoded);
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err.message);
        throw new Error('Token inválido ou expirado');
    }
};


export { generateToken };
