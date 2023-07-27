import { z } from 'zod';
import constant from '../utils/constant';

export async function getAllProductValidate(req:any) {
    try {
        const schema = z.object({
            query: z.object({
                page: z.string().optional(),
                limit: z.string().optional(),
            }),
            params: z.object({
                videoId: z.string({ required_error: 'Video Id is required' })
            })
        });
        await schema.parseAsync({query: req.query, params: req.params});

        return true;
    } catch (error: any) {
        const formatedErr = error.issues.map((val: {message:string}) => {
            return val.message;
        });
        return formatedErr;
    }
}

export async function addProductValidate(req:any) {
    const body = req.body;
    Object.keys(body).forEach(i => body[i] = body[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                videoId: z.string({required_error: 'Video ID is required'}),
                productUrl: z.string({required_error: 'Product URL is required'}),
                imageUrl: z.string({required_error: 'Image URL is required'}),
                title: z.string({required_error: 'Title is required'}).max(40),
                price: z.number({required_error: 'Price is required'})
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

