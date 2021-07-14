// import { CorsOptions } from "cors";
// import { Response, Request, NextFunction } from "express";

// const corsMiddleware=(reeq:Request, res:Response, next: NextFunction)=>{

// }
// const whiteList = process.env.WHITE_LIST.split(' ') || "";

// const corsOptions: CorsOptions = {
// 	origin: function (origin, callback) {
// 		if (whiteList.indexOf(origin) !== -1) callback(null, true);
// 		else callback(new Error('Not allowed by CORS'));
// 	},
// 	methods: ['GET', 'POST'],
// 	preflightContinue: false,
// };
// export corsOptions