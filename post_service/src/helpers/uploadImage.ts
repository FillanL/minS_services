import streamifier from 'streamifier';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';

export const uploadImage = async (
	buffer: Buffer
): Promise<UploadApiResponse | undefined> => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				upload_preset: 'minimalsyntax',
			},
			(error: any, result: any) => {
				if (result) resolve(result);
				else reject(error);
			}
		);
		streamifier.createReadStream(buffer).pipe(uploadStream);
	});
};

export const imageUpload = async (buffer: Buffer) => {
	return streamifier.createReadStream(buffer).pipe(
		cloudinary.uploader.upload_stream({
			upload_preset: 'minimalsyntax',
		})
	);
};
