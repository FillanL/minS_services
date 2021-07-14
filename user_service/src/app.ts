import express, { NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import config from './config';
import mongoose from 'mongoose';
import routes from './Routes';
import webAuth from './middlewares/auth';
import newErrorHandler from './middlewares/custumError';

const { PORT, mongoConnect, WHITE_LIST } = config;
const app = express();
const whiteList = WHITE_LIST.split(' ');
const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin) !== -1) callback(null, true);
		else callback(new Error('Not allowed by CORS'));
	},
	methods: ['GET', 'POST'],
	preflightContinue: false,
	credentials: true,
};

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use(express.json());
app.use((req,res,next)=> {
	console.log(req.cookies)
	next()
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(webAuth);
app.use(cors(corsOptions));
app.use(newErrorHandler);
app.use('/', routes);
app.listen(PORT, () =>
	console.log('\x1b[33m', `\tExpress is running on Port ${PORT}... `)
);

mongoose.connect(
	mongoConnect,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log('\x1b[35m', '\t  & Database is connected...', '\x1b[36m')
);
