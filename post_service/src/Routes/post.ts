import express from 'express';
import multer from 'multer';
import Post from '../controller/postContoller';

const router = express.Router();
router.get('/', Post.allPosts);
// router.get('/:id', Post.findArticle);
router.post('/', multer().single('img'), Post.createPost);
// router.patch('/:id', Post.updatePost);
// router.delete('/:id', Post.deletePost);
export default router;

// testing thids route
// router.get('/images/:id', Post.getImage)
