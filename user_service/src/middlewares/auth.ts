import auth from 'basic-auth';
import { NextFunction, Response, Request } from 'express';

const webAuth = (req: Request, res: Response, next: NextFunction) => {
	const credentials = auth(req);
	const isValidCredentials = (credentials: auth.BasicAuthResult) => {
		const { name, pass } = credentials;
		const isNameMatching = name === process.env.CRED_NAME;
		const isPassMatching = pass === process.env.CRED_PASS;
		
		if (isNameMatching && isPassMatching) return true;
		return false;
	};

	if (credentials && isValidCredentials(credentials)) return next();
	return res.status(400).json({ msg: 'invalid creds' });
};
export default webAuth;
