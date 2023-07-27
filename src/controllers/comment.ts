import { Request, Response } from "express";
import VideoServices from "../services/video";
import CommentServices from "../services/comment";
import { validateToken } from "../middleware/token";
import { responseError, responseSuccess } from "../utils/response";
import { addCommentValidate, getAllCommentValidate } from "../middleware/comment";

export async function commentList(req: Request, res: Response) {
    try {
        const validateData = await getAllCommentValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const videoCheck = await VideoServices.getVideoById(req.params.videoId);
        if (!videoCheck)
            return responseError(res, 404, 'Video ID not found');

        const comment = await CommentServices.getAllComment(req.params.videoId);
        
        return responseSuccess(res, {data: comment});
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addComment(req: Request, res: Response) {
    const reqData = req.body;
    try {
        const validateUser = await validateToken(req);
        switch (validateUser) {
            case 0:
                return responseError(res, 401, 'No authorization');
            case 1:
                return responseError(res, 401, 'Invalid token');
        }

        const validateData = await addCommentValidate(reqData);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const newComment = await CommentServices.addComment(reqData, validateUser.id);
        return responseSuccess(res, newComment);
    } catch (error) {
        return responseError(res, 500, error);
    }
}
