import express from 'express';

import {login, signUp, getUser} from '../controllers/login.js';
import auth from '../middleware/auth.js';
import multerUpload from '../middleware/multer.js';

const router = express.Router();

router.post('/', login);
router.post('/signup', multerUpload.single('image'), signUp);
router.get('/user', auth , getUser);


export default router;