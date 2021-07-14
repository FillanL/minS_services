import express from 'express';
import User from '../controller/userContoller';

const router = express.Router();

router.post('/new',  User.signUpUser);
router.post('/login' , User.loginUser);
router.get('/isAuth' , User.isAuth);
router.delete('/logout' , User.logoutUser);

export default router;