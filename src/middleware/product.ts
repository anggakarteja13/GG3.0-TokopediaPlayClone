import { z } from 'zod';

export async function getAllProductValidate(req:any) {
    try {
        const schema = z.object({
            query: z.object({
                page: z.coerce.number({ invalid_type_error: 'Page must be number' }).optional(),
                limit: z.coerce.number({ invalid_type_error: 'Limit must be number' }).optional(),
            }),
            params: z.object({
                videoId: z.string({ required_error: 'Video ID is required' })
                    .uuid({ message:'Not a valid ID' })
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

export async function addProductValidate(data:any) {
    Object.keys(data).forEach(i => data[i] = data[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                videoId: z.string({required_error: 'Video ID is required'})
                    .uuid({ message:'Not a valid ID' }),
                productUrl: z.string({required_error: 'Product URL is required', invalid_type_error: 'Product URL must be string'}),
                imgUrl: z.string({required_error: 'Image URL is required', invalid_type_error: 'Image URL must be string'}),
                title: z.string({required_error: 'Title is required', invalid_type_error: 'Title must be string'})
                    .min(1, 'Title is 1-40 character')
                    .max(40, 'Title is 1-40 character'),
                price: z.coerce.number({required_error: 'Price is required', invalid_type_error: 'Price must be number'})
                    .min(1, 'Price must be bigger than 0')
            })
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

