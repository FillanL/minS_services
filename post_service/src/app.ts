import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import config from './config';
import mongoose from 'mongoose';
import routes from './Routes';

const { PORT, mongoConnect, WHITE_LIST } = config;
const app = express();
const whiteList = WHITE_LIST.split(' ');
const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		if (!origin || whiteList.indexOf(origin) !== -1) callback(null, true);
		else callback(new Error('Not allowed by CORS'));
	},
	methods: ['GET, POST'],
	preflightContinue: false,
};
if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));
app.use(morgan('combined'));
app.use(express.json());
app.use(cors(corsOptions));
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
