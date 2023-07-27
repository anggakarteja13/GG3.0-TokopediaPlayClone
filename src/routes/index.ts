import { Router } from 'express';
const router = Router();
import userRouter from './user';
import videoRouter from './video';
import productRouter from './product';
import commentRouter from './comment';

router.use('/users', userRouter);
router.use('/videos', videoRouter);
router.use('/products', productRouter);
router.use('/comments', commentRouter);

export default router;
