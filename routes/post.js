import express from 'express';

import auth from '../middleware/auth.js';
import mutlerUpload from '../middleware/multer.js';

import { createPost, deletePost, updatePost, fetchUserPostLimit, likePost, createCommentPost, fetchCommentPost, updateCommentPost, deleteCommentPost, fetchPostsLimit } from '../controllers/post.js';

const router = express.Router();

router.get('/post', auth , fetchPostsLimit); //fetch post by limit
router.get(`/user`,auth, fetchUserPostLimit); //fetch user owned post post only
router.get(`/comment/:id`,auth, fetchCommentPost); //fetch comments on a post

router.delete(`/delete/:id`, auth, deletePost); //delete a post
router.delete(`/:postID/comment/:commentID`,auth, deleteCommentPost); //delete a comment

router.post('/create',auth , mutlerUpload.single('image'), createPost); // create a post
router.post(`/comment/:id`,auth, createCommentPost); //create comment

router.patch(`/update/:id`,auth, mutlerUpload.single('image'), updatePost); // update a post 
router.patch(`/like/:id`,auth,  likePost); //like a post
router.patch(`/comment/:id`,auth, updateCommentPost); //updating a comment




export default router;