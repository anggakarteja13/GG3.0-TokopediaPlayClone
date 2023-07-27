import { Request, Response } from "express";
import { CreateComment } from "../types/comment";
import CommentServices from "../services/comment";
import { validateToken } from "../middleware/token";
import { responseError, responseSuccess } from "../utils/response";
import { addCommentValidate, getAllCommentValidate } from "../middleware/comment";

export async function commentList(req: Request, res: Response) {
    try {
        const validateData = await getAllCommentValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);
        const videoId = req.params.id;

        const comment = await CommentServices.getAllComment(videoId);
        if (!comment)
            return responseError(res, 404, 'Video ID not found');
        
        return responseSuccess(res, {data: comment});
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addComment(req: Request, res: Response) {
    try {
        const validateUser = await validateToken(req);
        if (validateUser === 0)
            return responseError(res, 401, 'No authorization');
        else if (validateUser === 1)
            return responseError(res, 401, 'No token provided');
        else if (validateUser === 2)
            return responseError(res, 401, 'Invalid token');

        const validateData = await addCommentValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const createData: CreateComment = {
            userId: req.body.userId,
            videoId: req.body.videoId,
            comment: req.body.comment
        }

        const newVideo = await CommentServices.addComment(createData);
        return responseSuccess(res, newVideo);
    } catch (error) {
        return responseError(res, 500, error);
    }
}
