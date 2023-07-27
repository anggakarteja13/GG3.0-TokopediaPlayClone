import Jwt from 'jsonwebtoken';
import config from '../config/config.env';

export function createJwtToken(id: string, role: string) {
    return Jwt.sign(
        { id, role },
        config.jwt.secretKey,
        { expiresIn: config.jwt.expired }
    );
}

export function verifyToken(token: string): any {
    return Jwt.verify(token, config.jwt.secretKey);
}