import constant from "../utils/constant";
import { Request, Response } from "express";
import VideoServices from "../services/video";
import { validateToken } from "../middleware/token";
import { responseError, responseSuccess } from "../utils/response";
import { addVideoValidate, getVideoValidate, getVideoListValidate } from "../middleware/video";

export async function getVideo(req: Request, res: Response) {
    try {
        const validateData = await getVideoValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const videos = await VideoServices.getVideoById(req.params.videoId);
        
        return responseSuccess(res, videos);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function getVideoList(req: Request, res: Response) {
    try {
        const validateData = await getVideoListValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const { page, limit, search } = req.query as {
            page: string|null|undefined, limit: string|null|undefined, search: string|null|undefined
        };

        const videos = await VideoServices.getAllVideo(page, limit, search);
        
        return responseSuccess(res, videos);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addVideo(req: Request, res: Response) {
    const reqData = req.body;
    try {
        const validateUser = await validateToken(req);
        switch (validateUser) {
            case 0:
                return responseError(res, 401, 'No authorization');
            case 1:
                return responseError(res, 401, 'Invalid token');
        }
        if (validateUser.role === constant.userRole)
            return responseError(res, 403, 'Not enough privillege');
        
        const validateData = await addVideoValidate(reqData);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const checkVideo = await VideoServices.getVideoByUrl(reqData.videoUrl);
        if (checkVideo)
            return responseError(res, 400, 'VideoUrl is exist');

        const newVideo = await VideoServices.addVideo(reqData, validateUser.id);
        return responseSuccess(res, newVideo);
    } catch (error) {
        return responseError(res, 500, error);
    }
}
