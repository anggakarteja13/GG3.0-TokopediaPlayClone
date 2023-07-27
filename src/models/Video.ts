import { Schema, Document, model } from "mongoose";

export type VideoDocument = Document & {
    userId: Schema.Types.ObjectId,
    thumbnailUrl: string,
    videoUrl: string,
    title: string
}

const VideoSchema = new Schema<VideoDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        thumbnailUrl: {
            type: String,
            required: [true, 'Video Thumbnail URL is needed']
        },
        videoUrl: {
            type: String,
            unique: true,
            required: [true, 'Video URL is needed']
        },
        title: {
            type: String,
            required: [true, 'Video Title needed']
        }
    },
    {
        timestamps: {},
        collection: 'videos'
    }
);

const Video = model<VideoDocument>('Video', VideoSchema);

export default Video;
