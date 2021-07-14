import express from 'express';
import post from './User';

const router = express.Router();

router.use('/user', post);

export default router;
