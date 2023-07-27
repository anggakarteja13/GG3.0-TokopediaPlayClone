import { z } from 'zod';
import constant from '../utils/constant';

export async function getAllCommentValidate(req:any) {
    try {
        const schema = z.object({
            params: z.object({
                videoId: z.string({ required_error: 'Video Id is required' })
            })
        });
        await schema.parseAsync({params: req.params});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

export async function addCommentValidate(req:any) {
    const body = req.body;
    Object.keys(body).forEach(i => body[i] = body[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                videoId: z.string({required_error: 'Video ID is required'}),
                userId: z.string({required_error: 'User ID is required'}),
                comment: z.string()
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

