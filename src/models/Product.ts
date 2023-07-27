import { v4 as uuidv4 } from "uuid";
import { Schema, model } from "mongoose";
import { ProductDocument } from "../types/product";

const ProductSchema = new Schema<ProductDocument>(
    {
        id: {
            type: String,
            required: true,
            default: uuidv4,
            index: true
        },
        userId: {
            type: String,
            required: [true, 'Product User ID is needed'],
            ref: 'User'
        },
        videoId: {
            type: String,
            required: [true, 'Product Video ID is needed'],
            ref: 'Video'
        },
        productUrl: {
            type: String,
            unique: true,
            required: [true, 'Product URL is needed']
        },
        imgUrl: {
            type: String,
            required: [true, 'Product Image URL is needed']
        },
        title: {
            type: String,
            required: [true, 'Product Title needed']
        },
        price: {
            type: Number,
            required: [true, 'Product Price needed']
        }
    },
    {
        timestamps: {},
        collection: 'products'
    }
);

const Product = model<ProductDocument>('Product', ProductSchema);

export default Product;
