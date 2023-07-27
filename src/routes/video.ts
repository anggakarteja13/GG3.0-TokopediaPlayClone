import { Router } from 'express';
const videoRouter = Router();
import { addVideo, videoList } from '../controllers/video';

videoRouter.get('/', videoList);
videoRouter.post('/', addVideo);

export default videoRouter;
