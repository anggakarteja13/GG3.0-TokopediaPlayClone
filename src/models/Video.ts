import { v4 as uuidv4 } from "uuid";
import { Schema, model } from "mongoose";
import { VideoDocument } from "../types/video";

const VideoSchema = new Schema<VideoDocument>(
    {
        id: {
            type: String,
            required: true,
            default: uuidv4,
            index: true
        },
        userId: {
            type: String,
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
