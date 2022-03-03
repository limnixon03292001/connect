import mongoose from 'mongoose';

import Post from '../models/post.js';
import cloudinary from '../middleware/cloudinary.js';

// create post 
export const createPost = async(req,res) => {
   
    try{
        if(!req.file){
            console.log('No image');
        } else{
            const cloudinary_data = await cloudinary.uploader.upload(req.file.path);
        
            const post = await new Post({
                _id: mongoose.Types.ObjectId(),
                users: req.user.id,
                description: req.body.description,
                postImg: cloudinary_data.secure_url,
                cloudinary_id: cloudinary_data.public_id,
            });
            const saveData = await post.save();
            const result = await Post.findOne(saveData).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();
            return res.status(201).json({result});
        }

        const post = await new Post({
            _id: mongoose.Types.ObjectId(),
            users: req.user.id,
            description: req.body.description,
            postImg: '',
            cloudinary_id: '',
        });

        const saveData = await post.save();
        const result = await Post.findOne(saveData).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();
        res.status(201).json({result});

    }catch(error){
        console.log(error);
        res.status(400).json({error});
    }
}

//get posts with a limit of 3 posts
export const fetchPostsLimit = async (req,res) => {
    const page = parseInt(req.query.page);
    const pageLimit = 4;

    try{
        const result = await Post.find().skip((page - 1 ) * pageLimit).limit(pageLimit).sort({postDate: 'desc'}).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();
        res.status(200).json({result})
    }catch(error){
        res.status(404).json({errors: error.message});
    }
}

export const fetchUserPostLimit = async(req,res) => { 
    const {user, page} = req.query;
 

    if(!mongoose.Types.ObjectId.isValid(user)) return res.status(404).json({errors: 'Invalid Id!'});
    try{
        
        const pageLimit =  3;

        const result = await Post.find({users: user }).skip((page - 1 ) * pageLimit).limit(pageLimit).sort({postDate: 'desc'}).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();

        res.status(200).json({result});
           
    }catch(error){
        res.status(500).json({errors: error.message});
        console.log(error);
    }
}

//delete a post 
export const deletePost = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors:"Error! Invalid id!"});
    try{
        let post = await Post.findById(id);
        if(post.cloudinary_id){
            await cloudinary.uploader.destroy(post.cloudinary_id);
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({msg: 'Deleted Successfully!'});
    }catch(error){
        console.log(error.message);
        res.status(500).json({errors: 'Something went wrong on the server'});
    }
}

export const updatePost = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors:"Error! Invalid id!"});
    try{
        let post = await Post.findById(id);

        if(!req.file){        
            //fires when we only update the description part
            if(req.body.imgUrl === post.postImg) {
                const postData = {  
                    description: req.body.description,
                    postImg: req.body.imgUrl
                }
                const result = await Post.findByIdAndUpdate(id, postData, {new: true}).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();
                return res.status(200).json({result});
            } 
            //fires when we dont want the image anymore
            await cloudinary.uploader.destroy(post.cloudinary_id);
            const postData = {  
                description: req.body.description,
                postImg: '',
                cloudinary_id: '',
            }
            const result = await Post.findByIdAndUpdate(id, postData, {new: true}).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();
            return res.status(200).json({result});

        }else{
            //fires when we want to update image into a new one
            if(post.cloudinary_id){
                await cloudinary.uploader.destroy(post.cloudinary_id);
            }
            const cloudinary_data = await cloudinary.uploader.upload(req.file.path);
            const postData = {
                description: req.body.description,
                postImg: cloudinary_data.secure_url,
                cloudinary_id: cloudinary_data.public_id,
            }
                const result = await Post.findByIdAndUpdate(id,postData, {new: true}).populate('users', '-password -confirmPassword -created_at -updatedAt').exec();
                return res.status(200).json({result});
        }

    }catch(error){
        res.status(409).json({errors: error.message});
    }

}

//like post
export const likePost = async(req,res) => {
    const {id} = req.params;
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors: "Error! Invalid id!"});

        //getting the post to like
        const post = await Post.findById(id);

        //checking the like array and finding the id of the user
        const index = post.likes.findIndex((id) => id === req.user.id);

        //logic for liking and unliking the post 
        if(index === -1){
             //executes when the user first time liking the post
            post.likes.push(req.user.id);
        }else{
            // executes when the user disliking the post 
            post.likes = post.likes.filter((id) => id !== req.user.id);
        }

        const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true}).select('likes');
        res.status(200).json({updatedPost});
}

export const fetchCommentPost = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({errors: 'Invalid ID!'});

    try{
        const result = await Post.findById(id).select('comment').populate('comment.user', '-password -confirmPassword -created_at -updatedAt').exec();
        res.status(200).json({result});
    }catch(error){
        res.status(500).json({errors: error.message});
    }
}


export const createCommentPost = async(req,res) => {
    const {id} = req.params;
    const {data} = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({errors: 'Invalid ID!'});

    try{
        const post = await Post.findById(id).select('comment').populate('comment.user', '-imageUrl -password -confirmPassword -created_at -updatedAt').exec();
        const comments = {
            user: req.user.id,
            commentData: data,
        }

        post.comment.unshift(comments);
        const saveData = await post.save();
        const result = await Post.findOne(saveData._id).select('comment').populate('comment.user', '-password -confirmPassword -created_at -updatedAt').exec();
        
        res.status(201).json({result});

    }catch(error){
        res.status(500).json({errors: error.message});
    }
} 

export const updateCommentPost =  async (req,res) => {
    const {id} = req.params;
    const {commentID, data} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({errors: 'Invalid ID!'});

    try{
        await Post.updateOne(
            {
                "_id": id, "comment._id": commentID, 
            }, 
            {
                $set: {
                    "comment.$.commentData": data,
                }
            }
        );
        
        const result = await Post.findOne(
            {   
                "_id": id,
                "comment._id": commentID,
        }).select('comment').populate('comment.user', '-password -confirmPassword -created_at -updatedAt').exec();
        res.status(200).json({result});
    }catch(error){
        res.status(500).json({errors: error.message});
    }
}

export const deleteCommentPost = async (req,res) => {
    const {postID, commentID}= req.params;
    try{
        await Post.updateOne(
            {
                "_id": postID, "comment._id": commentID,
            },
            {
                $pull: {comment: { _id: commentID }}}
        ).select('comment');
        res.status(200).json({msg: "Comment Deleted Successfully!"});
    }catch(error){
        res.status(500).json({errors: error.message});
        console.log(error);
    }
}
