import { Request, Response } from "express";
import VideoServices from "../services/video";
import CommentServices from "../services/comment";
import { responseError, responseSuccess } from "../utils/response";
import { addCommentValidate, getCommentListValidate } from "../middleware/comment";

export async function getCommentList(req: Request, res: Response) {
    try {
        const validateData = await getCommentListValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const videoCheck = await VideoServices.getVideoById(req.params.videoId);
        if (!videoCheck)
            return responseError(res, 404, 'Video ID not found');

        const comment = await CommentServices.getAllComment(req.params.videoId);
        
        return responseSuccess(res, comment);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

// export async function addComment(req: Request, res: Response) {
//     const reqData = req.body;
//     try {
//         const validateData = await addCommentValidate(reqData);
//         if (validateData !== true)
//             return responseError(res, 400, validateData);

//         const newComment = await CommentServices.addComment(reqData);
//         return responseSuccess(res, newComment);
//     } catch (error) {
//         return responseError(res, 500, error);
//     }
// }
