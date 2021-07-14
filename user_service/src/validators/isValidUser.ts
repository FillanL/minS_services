import User from '../Models/User';
import jwt from 'jsonwebtoken';

export const isValidUser = async(decodedObject: jwt.JwtPayload) => {
	const user = await User.findOne({ _id: decodedObject.userId });
	if (user && user.email === decodedObject.email) return true;
	return false;
};
