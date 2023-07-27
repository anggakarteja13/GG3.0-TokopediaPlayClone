import { z } from 'zod';
import constant from "../utils/constant";

export async function signUpValidate(data:any) {
    Object.keys(data).forEach(i => data[i] = data[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                userName: z.string({ required_error: 'userName is required', invalid_type_error: 'User Name must be string' })
                    .min(1, 'Minimum 1 character')
                    .max(16, 'Maximum 16 character'),
                email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be string'  })
                    .email('Not a valid email'),
                password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password must be string' }),
                role: z.enum([constant.merchantRole, constant.userRole],
                    { required_error: 'Role is required', invalid_type_error: 'Invalid Role' })
            }),
        });
        await schema.parseAsync({body: data});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

export async function loginValidate(data:any) {
    Object.keys(data).forEach(i => data[i] = data[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be string'  }),
                password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password must be string' }),
            }),
        });
        await schema.parseAsync({body: data});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

