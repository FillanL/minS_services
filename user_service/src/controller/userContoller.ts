import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../Models/User';
import { UserController } from '../interfaces';
import { isValidUser } from '../validators/isValidUser';
import { newTokenAndCookies } from '../helpers/setNewHeaders';
import config from '../config';
import isTokenExpired from '../helpers/isTokenExpired';
import { isEmailValid } from '../validators/isEmailValid';
import {decodePassword}  from '../helpers';

const userController: UserController = {};

userController.loginUser = async (req: Request, res: Response) => {
	try {
		const { ACCESS_SECRET, REFRESH_SECRET } = config || '';
		if (ACCESS_SECRET === '' || REFRESH_SECRET === '')
			return res.status(500).json({ message: 'unexpect env issues' });

		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(401).json({
				message: 'Invalid email or password',
			});
		const {passwordString} = decodePassword(password)
		const isPasswordValid = await bcrypt.compare(
			passwordString,
			existingUser.password
		);
		if (!isPasswordValid)
			return res.status(401).json({
				message: 'Invalid email or password',
			});
		const token = jwt.sign(
			{
				userId: existingUser._id,
				email: existingUser.email,
			},
			ACCESS_SECRET,
			{
				expiresIn: '60',
			}
		);
		const refreshToken = jwt.sign(
			{
				userId: existingUser._id,
				email: existingUser.email,
			},
			REFRESH_SECRET,
			{
				expiresIn: '7d',
			}
		);

		res.cookie('refreshToken', refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 5,
			httpOnly: true,
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			secure: process.env.NODE_ENV === 'production',
		});
		res.cookie('accessToken', token, {
			maxAge: 1000 * 60,
			httpOnly: true,
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			secure: process.env.NODE_ENV === 'production',
		});
		return res.status(200).json({
			token,
			message: 'Successfully logged in',
			user: existingUser.toObject()._id,
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Error',
		});
	}
};

userController.signUpUser = async (req: Request, res: Response) => {
	const { ACCESS_SECRET, REFRESH_SECRET } = config || '';
	if (ACCESS_SECRET === '' || REFRESH_SECRET === '')
		return res.status(500).json({ message: 'unexpect env issues' });
	try {
		const { email, password, matchPassword } = req.body;
		const {passwordString,	matchPasswordString} = decodePassword(password, matchPassword);
		if (matchPasswordString !== passwordString)
			return res.status(401).json({
				message: 'Passwords do not match',
			});
		const hasValidEmail: boolean = isEmailValid(email);
		if (!hasValidEmail)
			return res.status(401).json({
				message: 'Invalid email',
			});
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(500).json({
				message: 'User already exists',
			});

		const hashedPassword = await bcrypt.hash(passwordString, 10);
		const newUser = new User({
			email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();
		
		// can abstraact this to a helper function
		const token = jwt.sign(
			{
				userId: savedUser._id,
				email: savedUser.email,
			},
			ACCESS_SECRET,
			{
				expiresIn: '60',
			}
		);
		const refreshToken = jwt.sign(
			{
				userId: savedUser._id,
				email: savedUser.email,
			},
			REFRESH_SECRET,
			{
				expiresIn: '7d',
			}
		);
		res.cookie('refreshToken', refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 5,
			httpOnly: true,
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			secure: process.env.NODE_ENV === 'production',
		});
		res.cookie('accessToken', token, {
			maxAge: 1000 * 60,
			httpOnly: true,
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			secure: process.env.NODE_ENV === 'production',
		});

		return res.status(200).json({
			message: 'Successfully signed up',
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Error',
		});
	}
};

userController.isAuth = async (req: Request, res: Response) => {
	try {
		const {
			accessToken,
			refreshToken,
		}: { accessToken: string; refreshToken: string } = req.cookies || '';
		const { ACCESS_SECRET, REFRESH_SECRET } = config || '';

		if (ACCESS_SECRET === '' || REFRESH_SECRET === '')
			return res.status(401).json({ message: 'unAuth' });
		if (!accessToken && !refreshToken)
			return res.status(401).json({ message: 'Unauthorized' });

		if (accessToken) {
			const hasTokenExpired = isTokenExpired(accessToken);
			if (!hasTokenExpired) {
				const payload: jwt.JwtPayload = jwt.verify(
					accessToken,
					ACCESS_SECRET
				) as jwt.JwtPayload;
				const hasValidUser = await isValidUser(payload);

				if (!hasValidUser)
					return res.status(401).json({ Message: 'Unauthorized User' });
				const { newaccessToken } = newTokenAndCookies(res, payload);

				return res.status(200).json({ token: newaccessToken });
			}

			if (hasTokenExpired && !refreshToken)
				return res.status(401).json({ Message: 'Unauthorized User' });
		}
		if (refreshToken) {
			const hasTokenExpired = isTokenExpired(refreshToken);
			if (hasTokenExpired)
				return res.status(401).json({ Message: 'Unauthorized User' });

			const payload: jwt.JwtPayload = jwt.verify(
				refreshToken,
				REFRESH_SECRET
			) as jwt.JwtPayload;
			const hasValidUser = await isValidUser(payload);
			if (!hasValidUser)
				return res.status(401).json({ Message: 'Unauthorized User' });

			const { newaccessToken } = newTokenAndCookies(res, payload);

			return res.status(200).json({
				token: newaccessToken,
				message: 'Successfully authenticated',
			});
		}
		return res.status(401).json({ Message: 'Unauthorized User' });
	} catch (err) {
		return res.status(500).json({
			message: 'Error',
		});
	}
};

userController.logoutUser = async (req: Request, res: Response) => {
	try {
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		return res.status(200).json({
			message: 'Successfully logged out',
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Error',
		});
	}
};

export default userController;
