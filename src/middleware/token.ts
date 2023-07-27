import { Request } from "express";
import { verifyToken } from "../utils/jwt";

export function validateToken(req: Request): any | number {
    const { headers } = req;
    const { authorization } = headers;
  
    if (!authorization)
        return 0; //need auth

    const [bearer, token] = authorization.split(' ');
    if(!token)
        return 1; //no token provided

    const verify = verifyToken(token);
    if (!verify || !verify.id || !verify.role)
        return 1; //invalid token

    return verify;
}