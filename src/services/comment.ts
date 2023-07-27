import DB from "../db";
import User from "../models/User";
import Comment, { CommentDocument } from "../models/Comment";
import { CreateComment } from "../types/comment";

class CommentServices {
    static async getAllComment(videoId: string): Promise<CommentDocument[]|any> {
        try {
            const selectQuery = [
                'userId',
                'videoId',
                'comment'
            ];
            const populateQuery = {
                path: 'userId',
                select: ['userName'],
                model: User
            };
            const comment = await Comment
                .find({videoId}, selectQuery)
                .sort({createdAt: 'desc'})
                .limit(10)
                .populate(populateQuery);

            return comment;
        } catch (error) {
            return {error};
        }
    }

    static async addComment(data: CreateComment): Promise<CommentDocument|any> {
        const session = await DB.conn.startSession();
        try {
            session.startTransaction();
            const newComment = await Comment.create(data);
            await session.commitTransaction();
            return {
                userId: newComment.userId,
                videoId: newComment.videoId,
                comment: newComment.comment
            };
        } catch (error) {
            await session.abortTransaction();
            return {error};
        } finally {
            await session.endSession();
        }
    }
}

export default CommentServices;
