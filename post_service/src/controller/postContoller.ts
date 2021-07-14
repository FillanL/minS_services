import { Request, Response } from 'express';
import Post from '../Models/Post';
import { convertToAvif } from '../helpers';
import { uploadImage } from '../helpers/uploadImage';
import { PostContollerINF } from '../interfaces';
import { UploadApiResponse } from 'cloudinary';

const PostContoller: PostContollerINF = {};

PostContoller.allPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find();
		return res.status(200).json({ posts });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

PostContoller.findPost = async (req: Request, res: Response) => {
	const id = req.params.id;

	return await Post.findById(id)
		.exec()
		.then((article: any) => res.json(article))
		.catch((err: { message: any }) =>
			res.status(500).send({ error: err.message })
		);
};

PostContoller.createPost = async (req: Request, res: Response) => {
	try {
		const { title, description, content, isFeatured, createdBy } = req.body;
		let mainImageUrl: string | undefined |  UploadApiResponse;

		const existingTitledPost = await Post.findOne({ title: title });
		if (existingTitledPost)
			return res.status(400).json({ msg: 'title already exist' });

		if (req.file) {
			const { buffer } = req.file;
			const newFile = await convertToAvif(buffer);
			mainImageUrl = await uploadImage(newFile);
			// if (typeof imageResponse !== 'undefined')
			// 	mainImageUrl = imageResponse['secure_url'];
		}

		const post = new Post({
			title,
			description,
			content,
			isFeatured,
			createdBy,
			mainImageUrl,
		});
		if (post) await post.save();

		if (post) return res.status(200).json(post);
	} catch (error) {
		return res.status(500).json({ msg: 'no impl', error });
	}
};

PostContoller.updatePost = async (req: Request, res: Response) => {
	const id = req.params.id;
	const p = await Post.findById(id);
	//     .exec()
	//     .then((m: any) => m)
	return res.status(400).json({ msg: 'no impl' });
};

PostContoller.deletePost = async (req: Request, res: Response) => {
	const id = req.params.id;

	const deletedPost = await Post.deleteOne({ _id: id });

	// if success return
	res.status(200).json(id);
	return res.status(400).json({ msg: 'no impl' });
};
export default PostContoller;
