import Product from "../models/Product";
import { pagination } from "../utils/functions";
import { CreateProduct, ProductDocument } from "../types/product";

class ProductServices {
    static async getProduct(productUrl: string): Promise<ProductDocument|any> {
        const selectQuery = [
            'id',
            'productUrl',
            'imgUrl',
            'title',
            'price',
        ];
        const user = await Product.findOne({productUrl}, selectQuery);

        return user;
    }

    static async getAllProduct(
        videoId: string,
        page: string|null|undefined,
        limit: string|null|undefined
    ): Promise<{data: ProductDocument[], totalPages: number, currentPage: number}|any> {
        const { pageNum, limitNum, skipNum } = pagination(page, limit);
        const selectQuery = [
            'id',
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
    }

    static async addProduct(data: CreateProduct, userId: string): Promise<ProductDocument|any> {
        const createData: CreateProduct = {
            userId,
            videoId: data.videoId,
            productUrl: data.productUrl,
            imgUrl: data.imgUrl,
            title: data.title,
            price: data.price,
        }
        const newProduct = await Product.create(createData);
        return {
            id: newProduct.id,
            videoId: newProduct.videoId,
            productUrl: newProduct.productUrl,
            imgUrl: newProduct.imgUrl,
            title: newProduct.title,
            price: newProduct.price,
        };
    }
}

export default ProductServices;
