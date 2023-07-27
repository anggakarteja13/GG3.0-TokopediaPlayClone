import { Document } from "mongoose"

export interface CreateProduct {
    userId: string,
    videoId: string,
    productUrl: string,
    imgUrl: string,
    title: string,
    price: number
}

export type ProductDocument = Omit<CreateProduct, 'userId'|'videoId'> & Document & {
    id: string,
    userId: string,
    videoId: string
}
