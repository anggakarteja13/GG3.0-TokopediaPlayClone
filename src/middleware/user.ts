import { z } from 'zod';
import constant from "../utils/constant";

export async function signUpValidate(req:any) {
    const body = req.body;
    Object.keys(body).forEach(i => body[i] = body[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                userName: z.string({ required_error: 'userName is required' })
                    .min(1, 'Minimum 1 character')
                    .max(16, 'Maximum 16 character'),
                email: z.string({required_error: 'email is required'})
                    .email('Not a valid email'),
                password: z.string({required_error: 'password is required'}),
                role: z.enum([constant.merchantRole, constant.userRole])
            }),
        });
        await schema.parseAsync({body: req.body});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

export async function loginValidate(req:any) {
    const body = req.body;
    Object.keys(body).forEach(i => body[i] = body[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                email: z.string({required_error: 'email is required'})
                    .email('Not a valid email'),
                password: z.string({required_error: 'password is required'})
            }),
        });
        await schema.parseAsync({body: req.body});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

