import { v4 as uuidv4 } from "uuid";
import { Schema, model } from "mongoose";
import { CommentDocument } from "../types/comment";

const CommentSchema = new Schema<CommentDocument>(
    {
        id: {
            type: String,
            required: true,
            default: uuidv4,
            index: true
        },
        userName: {
            type: String,
            required: [true, 'Comment User Name is needed']
        },
        videoId: {
            type: String,
            index: true,
            required: [true, 'Comment Video ID is needed'],
            ref: 'Video'
        },
        comment: {
            type: String,
            required: [true, 'Comment content needed']
        }
    },
    {
        timestamps: {},
        collection: 'comments'
    }
);

const Comment = model<CommentDocument>('Comment', CommentSchema);

export default Comment;
