import dotenv from 'dotenv';
dotenv.config();

interface EnvConfigType {
    bcrypt_salt: number,
    env: string,
    db: {
        uri: string,
        name: string
    },
    jwt: {
        secretKey: string,
        expired: string
    }
    port: number,
    corsOrigin: string
}

export const config: EnvConfigType = {
    bcrypt_salt: parseInt(String(process.env.BYCRYPT_SALT)) || 10,
    env: String(process.env.NODE_ENV),
    db: {
        uri: String(process.env.MONGO_URI),
        name: String(process.env.MONGO_NAME)
    },
    jwt: {
        secretKey: String(process.env.JWT_SECRET_KEY),
        expired: String(process.env.JWT_EXPIRED) || "24h",
    },
    port: Number(process.env.PORT) || 3000,
    corsOrigin: String(process.env.ORIGIN) || '*'
}

export default config;
