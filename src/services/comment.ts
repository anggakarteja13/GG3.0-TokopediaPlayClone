import Comment from "../models/Comment";
import { CreateComment, CommentDocument } from "../types/comment";

class CommentServices {
    static async getAllComment(videoId: string): Promise<CommentDocument[]|any> {
        const selectQuery = [
            'userName',
            'comment'
        ];
        const comment = await Comment
            .find({videoId}, selectQuery)
            .sort({createdAt: 'desc'})
            .limit(10)

        return comment;
    }

    static async addComment(data: CreateComment): Promise<CommentDocument|any> {
        const createData: CreateComment = {
            userName: data.userName,
            videoId: data.videoId,
            comment: data.comment
        }
        const newComment = await Comment.create(createData);
        return {
            userName: newComment.userName,
            comment: newComment.comment
        }
    }
}

export default CommentServices;
