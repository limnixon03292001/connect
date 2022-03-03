import express from 'express';
import auth from '../middleware/auth.js';
import mutlerUpload from '../middleware/multer.js';

import { updateUser, getUser, searchUser, followUser, usersLimit, followersLimit, updateCoverPhoto, updateProfilePicture } from '../controllers/users.js';

// users

const router = express.Router();

// router.get('/', auth , users); //get all users
router.get('/all', auth, usersLimit) // get users by limit basically a pagination 
router.get(`/followers`, auth, followersLimit); //get followers of the current users by limit basically a pagination hehe
router.get(`/user/:id`, auth, getUser); //get single user
router.get(`/search`, auth, searchUser); //search user

router.patch(`/:id`, auth, updateUser );//update name of user
router.patch(`/follow/:id`, auth, followUser); //follow a user
router.patch(`/coverPhoto/:id`, auth, mutlerUpload.single('image'), updateCoverPhoto); //update coverphoto of user
router.patch(`/profilePicture/:id`, auth, mutlerUpload.single('image'), updateProfilePicture); //update profilePicture of user

export default router;