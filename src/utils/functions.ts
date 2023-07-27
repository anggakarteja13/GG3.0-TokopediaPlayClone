import bcrypt from 'bcryptjs';
import constant from './constant';
import config from '../config/config.env';

export function pagination(
    queryPage: string|null|undefined,
    queryLimit: string|null|undefined
): {pageNum: number, skipNum: number, limitNum: number} {
    const pageNum = queryPage ? Number(queryPage) : constant.page;
    const limitNum = queryLimit ? Number(queryLimit) : constant.limit;
    const skipNum = (pageNum - 1) * limitNum;

    return { pageNum, limitNum, skipNum };
}

export async function hashingPassword(password: string) {
    const salt = await bcrypt.genSalt(config.bcrypt_salt);
    return bcrypt.hash(password, salt);
}

export async function validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
