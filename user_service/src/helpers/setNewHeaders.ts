import config from '../config';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function newTokenAndCookies(
	res: Response,
	payload: jwt.JwtPayload
) {
	const { REFRESH_SECRET, ACCESS_SECRET } = config;
	const newaccessToken = jwt.sign(
		{ userId: payload.userId, email: payload.email },
		ACCESS_SECRET,
		{
			expiresIn: '1h',
		}
	);
	const newrefreshToken = jwt.sign(
		{ userId: payload.userId, email: payload.email },
		REFRESH_SECRET,
		{
			expiresIn: '1h',
		}
	);
	//  create new resfresh token and resfresh cookie
	res.cookie('refreshToken', newrefreshToken, {
		maxAge: 1000 * 60 * 60 * 24 * 5,
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
	});
	res.cookie('accessToken', newaccessToken, {
		maxAge: 1000 * 60,
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
	});
	return { res, newaccessToken };
}
