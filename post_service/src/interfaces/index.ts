import { Response, Request } from 'express';
export interface PostContollerINF {
	[key: string]: (
		req: Request,
		res: Response
	) => Promise<Response<any> | undefined>;
}
