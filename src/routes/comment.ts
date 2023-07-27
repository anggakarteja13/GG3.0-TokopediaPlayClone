import { Router } from 'express';
const commentRouter = Router();
import { commentList, addComment } from '../controllers/comment';

commentRouter.get('/:videoId', commentList);
commentRouter.post('/', addComment);

export default commentRouter;
