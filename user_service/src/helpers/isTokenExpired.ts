import Jwt from 'jsonwebtoken';

export default function isTokenExpired(token: string): boolean {
	const { exp } = Jwt.decode(token) as {
		exp: number;
	};
	return new Date(exp * 1000).getTime() <= Date.now();
}
