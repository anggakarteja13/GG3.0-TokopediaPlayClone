import { Router } from 'express';
const userRouter = Router();
import { login, signUp } from '../controllers/user';

userRouter.post('/login', login);
userRouter.post('/signup', signUp);

export default userRouter;
