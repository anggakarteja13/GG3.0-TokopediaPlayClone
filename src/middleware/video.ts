import { z } from 'zod';
import constant from '../utils/constant';

export async function getVideosValidate(req:any) {
    try {
        const schema = z.object({
            query: z.object({
                page: z.string().optional(),
                limit: z.string().optional(),
                search: z.string().optional()
            }),
        });
        await schema.parseAsync({query: req.query});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

export async function addVideoValidate(req:any) {
    const body = req.body;
    Object.keys(body).forEach(i => body[i] = body[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                thumbnailUrl: z.string({required_error: 'Thumbnail URL is required'}),
                videoUrl: z.string({required_error: 'Video URL is required'}),
                title: z.string({required_error: 'Title is required'}).max(40)
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

