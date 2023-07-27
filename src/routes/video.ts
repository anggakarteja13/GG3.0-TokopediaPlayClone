import { Router } from 'express';
const videoRouter = Router();
import { addVideo, getVideoList, getVideo } from '../controllers/video';

videoRouter.get('/', getVideoList);
videoRouter.get('/:videoId', getVideo);
videoRouter.post('/', addVideo);

export default videoRouter;
