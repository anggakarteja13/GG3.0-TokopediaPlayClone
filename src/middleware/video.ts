import { z } from 'zod';

export async function getVideoValidate(req:any) {
    try {
        const schema = z.object({
            params: z.object({
                videoId: z.string({required_error: 'Video ID is required'})
                    .uuid({ message:'Not a valid ID' })
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

export async function getVideoListValidate(req:any) {
    try {
        const schema = z.object({
            query: z.object({
                page: z.coerce.number({ invalid_type_error: 'Page must be number' }).optional(),
                limit: z.coerce.number({ invalid_type_error: 'Limit must be number' }).optional(),
                search: z.string({ invalid_type_error: 'Search must be string' }).optional()
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

export async function addVideoValidate(data:any) {
    Object.keys(data).forEach(i => data[i] = data[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                thumbnailUrl: z.string({ required_error: 'Thumbnail URL is required', invalid_type_error: 'Thumbnail URL must be string'}),
                videoUrl: z.string({ required_error: 'Video URL is required', invalid_type_error: 'Video URL must be string'}),
                title: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be string'})
                    .min(1, 'Title is 1-40 character').max(40, 'Title is 1-40 character')
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

