import constant from "../utils/constant";
import { Request, Response } from "express";
import ProductServices from "../services/product";
import { validateToken } from "../middleware/token";
import { responseError, responseSuccess } from "../utils/response";
import { addProductValidate, getAllProductValidate } from "../middleware/product";
import { CreateProduct } from "../types/product";

export async function productList(req: Request, res: Response) {
    try {
        const validateData = await getAllProductValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);
        
        const { page, limit } = req.query as {page: string|null|undefined, limit: string|null|undefined};
        const videoId = req.params.id;

        const product = await ProductServices.getAllProduct(videoId, page, limit);
        if (!product)
            return responseError(res, 404, 'Video ID not found');
        
        return responseSuccess(res, {data: product});
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addProduct(req: Request, res: Response) {
    try {
        const validateUser = await validateToken(req);
        if (validateUser === 0)
            return responseError(res, 401, 'No authorization');
        else if (validateUser === 1)
            return responseError(res, 401, 'No token provided');
        else if (validateUser === 2)
            return responseError(res, 401, 'Invalid token');
        if (validateUser.role === constant.userRole)
            return responseError(res, 403, 'Not enough privillege');
        
        const validateData = await addProductValidate(req);
        if (validateData !== true)
            return responseError(res, 400, validateData);

        const createData: CreateProduct = {
            videoId: req.body.videoId,
            productUrl: req.body.productUrl,
            imgUrl: req.body.imgUrl,
            title: req.body.title,
            price: req.body.price,
        }

        const checkVideo = await ProductServices.getProduct(createData.productUrl);
        if (checkVideo)
            return responseError(res, 400, 'Product URL is exist');

        const newVideo = await ProductServices.addProduct(createData);
        return responseSuccess(res, newVideo);
    } catch (error) {
        return responseError(res, 500, error);
    }
}
