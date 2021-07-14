import express from 'express';
import multer from 'multer';
import Post from '../controller/postContoller';

const router = express.Router();
router.get('/', Post.allPosts);
router.post('/', multer().single('img'), Post.createPost);

export default router;