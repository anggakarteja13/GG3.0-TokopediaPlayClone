import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import config from './config/config.env';
import router from './routes/index';
import logger from 'morgan';
import cors from 'cors';

const app = express();
const { port, env, corsOrigin } = config;
const corsOptions = {
    origin: corsOrigin,
    methods: ['GET', 'POST'],
};

app.set('env', env);
app.set('port', port);

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
app.use('/ping', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'Success',
        statusCode: 200,
        message: 'Sever is LIVE'
    });
});
app.use('/', (req: Request, res: Response) => {
    res.status(404).json({
        status: 'Error',
        statusCode: 404,
        message: `Requested path -> ${req.path} Not Found`
    });
});

export default app;
