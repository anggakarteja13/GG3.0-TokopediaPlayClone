import { z } from 'zod';

export async function getAllCommentValidate(req:any) {
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

export async function addCommentValidate(data:any) {
    Object.keys(data).forEach(i => data[i] = data[i].trim());
    try {
        const schema = z.object({
            body: z.object({
                videoId: z.string({required_error: 'Video ID is required'})
                    .uuid({ message:'Not a valid ID' }),
                comment: z.string({ required_error: 'User ID is required', invalid_type_error: 'Comment must be string' })
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

