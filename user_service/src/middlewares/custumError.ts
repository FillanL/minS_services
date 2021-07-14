import { NextFunction, Response, Request } from 'express';

const newErrorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(401).json({ error: err.message });
};
export default newErrorHandler;
