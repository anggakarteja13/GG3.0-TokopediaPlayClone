import { Router } from 'express';
const userRouter = Router();
import { login, profile, signUp } from '../controllers/user';

userRouter.get('/profile', profile);
userRouter.post('/login', login);
userRouter.post('/signup', signUp);

export default userRouter;
