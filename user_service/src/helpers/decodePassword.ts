export const decodePassword = (password: string, matchPassword?: string) => {
	const passwordString = Buffer.from(password, 'base64').toString('ascii');
	const matchPasswordString = Buffer.from(matchPassword || '', 'base64').toString(
		'ascii'
	);
	return { passwordString, matchPasswordString };
};