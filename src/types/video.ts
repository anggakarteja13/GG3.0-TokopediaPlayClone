import { Document } from "mongoose"

export interface CreateVideo {
    userId: string,
    thumbnailUrl: string,
    videoUrl: string,
    title: string
}

export type VideoDocument = Omit<CreateVideo, 'userId'> & Document & {
    id: string,
    userId: string
}
