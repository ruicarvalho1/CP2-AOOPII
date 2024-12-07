import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'dsadhuksahduksahkdhakdhaksuhdkuashduashdusahduiahfuigdsfgdsilufgdsiufgdsiugfduisg';

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Token invalid');
    }
};
