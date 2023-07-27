import { Document } from "mongoose"

export type CreateComment = {
    userId: string,
    videoId: string,
    comment: string
}

export type CommentDocument = Omit<CreateComment, 'userId'|'videoId'> & Document & {
    userId: string,
    videoId: string
}
