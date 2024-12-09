import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export function encryptId(rawData) {
    const cipher = crypto.createCipheriv('aes-128-ecb', secretKey, null);
    let encrypted = cipher.update(rawData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decryptId(encryptedData) {
    const decipher = crypto.createDecipheriv('aes-128-ecb', secretKey, null);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
