import { Schema } from "mongoose"

export type CreateComment = {
    userId: Schema.Types.ObjectId,
    videoId: Schema.Types.ObjectId,
    comment: string
}
