import { Request } from "express";
import { verifyToken } from "../utils/jwt";

export function validateToken(req: Request): any | number {
    const { headers } = req;
    const { authorization } = headers;
  
    if (!authorization)
        return 0; //need auth
  
    const bearerToken = authorization.split(' ');
    const token = bearerToken[1];

    if(!token)
        return 1; //no token provided

    const verify = verifyToken(token);
    if (!verify)
        return 2; //invalid token

    return verify;
}