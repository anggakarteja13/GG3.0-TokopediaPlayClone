import { Router } from 'express';
const commentRouter = Router();
import { getCommentList } from '../controllers/comment';

commentRouter.get('/:videoId', getCommentList);
// commentRouter.post('/', addComment);

export default commentRouter;
