import { Schema, Document, model } from "mongoose";

export type CommentDocument = Document & {
    userId: Schema.Types.ObjectId,
    videoId: Schema.Types.ObjectId,
    comment: string
}

const CommentSchema = new Schema<CommentDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            unique: true,
            required: [true, 'Comment User ID is needed'],
            ref: 'User'
        },
        videoId: {
            type: Schema.Types.ObjectId,
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
