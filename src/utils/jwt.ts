import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config.env';

export function createJwtToken(_id: string, role: string) {
    return Jwt
        .sign({ _id, role },
        config.jwt.secretKey,
        { expiresIn: config.jwt.expired });
}

export function verifyToken(token: string): any|boolean {
    try {
        return Jwt.verify(token, config.jwt.secretKey);
    } catch (error) {
        return false;
    }
}