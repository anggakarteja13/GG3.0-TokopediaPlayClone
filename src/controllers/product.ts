import constant from "../utils/constant";
import { Request, Response } from "express";
import VideoServices from "../services/video";
import ProductServices from "../services/product";
import { validateToken } from "../middleware/token";
import { responseError, responseSuccess } from "../utils/response";
import { addProductValidate, getProductListValidate, getProductValidate } from "../middleware/product";

export async function getProduct(req: Request, res: Response) {
    try {
        const validateData = await getProductValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const product = await ProductServices.getProductById(req.params.productId);
        
        return responseSuccess(res, product);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function getProductList(req: Request, res: Response) {
    try {
        const validateData = await getProductListValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);
        
        const { page, limit } = req.query as {page: string|null|undefined, limit: string|null|undefined};
        const videoId = req.params.videoId;

        const video = await VideoServices.getVideoById(videoId);
        if (!video)
            return responseError(res, 404, 'Video ID not found');

        const product = await ProductServices.getAllProduct(videoId, page, limit);
        
        return responseSuccess(res, product);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addProduct(req: Request, res: Response) {
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
        
        const validateData = await addProductValidate(reqData);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const [checkProduct, checkVideo ] = await Promise.all([
            ProductServices.getProductByUrl(reqData.productUrl),
            VideoServices.getVideoById(reqData.videoId)
        ]);
        if (checkProduct)
            return responseError(res, 400, 'Product URL is exist');
        if (!checkVideo)
            return responseError(res, 400, 'Video ID is not exist');

        const newVideo = await ProductServices.addProduct(reqData, validateUser.id);
        return responseSuccess(res, newVideo);
    } catch (error) {
        return responseError(res, 500, error);
    }
}
