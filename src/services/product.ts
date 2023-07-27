import DB from "../db";
import { pagination } from "../utils/functions";
import Product, { ProductDocument } from "../models/Product";
import { CreateProduct } from "../types/product";

class ProductServices {
    static async getProduct(productUrl: string): Promise<ProductDocument|any> {
        try {
            const selectQuery = [
                '_id',
                'productUrl',
                'imgUrl',
                'title',
                'price',
            ];
            const user = await Product.findOne({productUrl}, selectQuery);

            return user;
        } catch (error) {
            return {error};
        }
    }

    static async getAllProduct(
        videoId: string,
        page: string|null|undefined,
        limit: string|null|undefined
    ): Promise<{data: ProductDocument[], totalPages: number, currentPage: number}|any> {
        try {
            const { pageNum, limitNum, skipNum } = pagination(page, limit);
            const selectQuery = [
                '_id',
                'videoId',
                'productUrl',
                'imgUrl',
                'title',
                'price',
            ];
            const products = await Product
                .find({videoId}, selectQuery)
                .limit(limitNum)
                .skip(skipNum);
            const count = await Product.countDocuments();

            return {
                products,
                totalPages: Math.ceil(count / limitNum),
                currentPage: pageNum
            };
        } catch (error) {
            return {error};
        }
    }

    static async addProduct(data: CreateProduct): Promise<ProductDocument|any> {
        const session = await DB.conn.startSession();
        try {
            session.startTransaction();
            const newProduct = await Product.create(data);
            await session.commitTransaction();
            return {
                _id: newProduct._id,
                videoId: newProduct.videoId,
                productUrl: newProduct.productUrl,
                imgUrl: newProduct.imgUrl,
                title: newProduct.title,
                price: newProduct.price,
            };
        } catch (error) {
            await session.abortTransaction();
            return {error};
        } finally {
            await session.endSession();
        }
    }
}

export default ProductServices;
