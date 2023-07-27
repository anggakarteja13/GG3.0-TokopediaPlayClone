import { Schema, Document, model } from "mongoose";

export type ProductDocument = Document & {
    userId: Schema.Types.ObjectId,
    videoId: Schema.Types.ObjectId,
    productUrl: string,
    imgUrl: string,
    title: string,
    price: number
}

const ProductSchema = new Schema<ProductDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'Product User ID is needed'],
            ref: 'User'
        },
        videoId: {
            type: Schema.Types.ObjectId,
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
