import path from 'path';
import logger from 'morgan';
import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', router);

export default app;
