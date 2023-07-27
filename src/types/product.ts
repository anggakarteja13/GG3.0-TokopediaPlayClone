import { Schema } from "mongoose"

export type CreateProduct = {
    videoId: Schema.Types.ObjectId,
    productUrl: string,
    imgUrl: string,
    title: string,
    price: number
}
