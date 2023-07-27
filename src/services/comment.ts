import User from "../models/User";
import Comment from "../models/Comment";
import { CreateComment, CommentDocument } from "../types/comment";

class CommentServices {
    static async getAllComment(videoId: string): Promise<CommentDocument[]|any> {
        const selectQuery = [
            'userId',
            'comment'
        ];
        const populateQuery = {
            path: 'userId',
            select: 'userName',
            localField: 'userId',
            foreignField: 'id',
            model: User
        };
        const comment = await Comment
            .find({videoId}, selectQuery)
            .sort({createdAt: 'desc'})
            .limit(6)
            .populate(populateQuery);

        return comment;
    }

    static async addComment(data: CreateComment, userId: string): Promise<CommentDocument|any> {
        const createData: CreateComment = {
            userId: userId,
            videoId: data.videoId,
            comment: data.comment
        }
        const newComment = await Comment.create(createData);
        return {
            userId: newComment.userId,
            videoId: newComment.videoId,
            comment: newComment.comment
        }
    }
}

export default CommentServices;
