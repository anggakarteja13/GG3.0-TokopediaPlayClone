import { Document } from "mongoose"

export type CreateComment = {
    userName: string,
    videoId: string,
    comment: string
}

export type CommentDocument = Omit<CreateComment, 'userName'|'videoId'> & Document & {
    userName: string,
    videoId: string
}
