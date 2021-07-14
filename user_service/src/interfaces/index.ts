import { Response, Request } from 'express';
export interface UserController {
	[key: string]: (
		req: Request,
		res: Response
	) => Promise<Response<any> | undefined>;
}
