import mongoose from 'mongoose';
import Users from '../models/users.js';
import cloudinary from '../middleware/cloudinary.js';

// export const users = async (req,res) => {
//     try{
//         const result = await Users.find().select('-password -confirmPassword');
//         res.status(200).json({result});
//     }catch(error){
//         console.log(error);
//         res.status(500).json({errors: 'Something went wrong on the server.'})
//     }
// }

export const usersLimit = async(req,res) => {
    const page = parseInt(req.query.page);
    const usersLimit = 5;

    try{
        const result = await Users.find().skip((page - 1) * usersLimit).limit(usersLimit).sort({created_at: 'desc'}).select('-password -confirmPassword');
        res.status(200).json({result});

    }catch(error){
        res.status(500).json({errors: 'Something went wrong on the server'});
    }
}

export const followersLimit = async(req,res) => {
    const page = parseInt(req.query.page) || 1;
    const followersLimit = 4;
    const {id} = req.user;
    try {
    
        const {followers} = await Users.findById(id).populate('followers.user','-followers -password -confirmPassword').exec();
        const result = followers.slice((page - 1) * followersLimit, page * followersLimit);
        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({errors: 'Something went wrong on the server'});
        console.log(error.message);
    }
}


//get single user
export const getUser = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors: 'Invalid id!'});
    try {
        const result = await Users.findById(id).select('-password -confirmPassword');
        res.status(200).json({result});
    } catch (error) {
        res.status(400).json({errors: error.message});
    }
}

//search user
export const searchUser = async (req,res) => {
    const {q} = req.query;
    try {
        let name = [];

        q.split(' ').forEach(element => {
            let data = new RegExp(element, 'i');
            name.push(data);
        });
        const result = await Users.find({$or:[{firstname: {$in: name}}, {lastname:{$in: name}} ]}).select('-password -confirmPassword');
        res.status(200).json({result});
    } catch (error) {
        res.status(404).json({errors: error.message});
    }
}


//update single user // update name
export const updateUser = async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors: 'Invalid Id!'});
    try {
        const result = await Users.findByIdAndUpdate(id, data, {new:true}).select('-password -confirmPassword');
        res.status(200).json({result});

    } catch (error) {
        res.status(409).json({errors: error.message});
    }
}

export const updateCoverPhoto = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors: 'Invalid Id!'});
    if(req.user.id !== id) return res.status(403).json({errors: 'You cannot update other users profile!'});

    try{
        let user = await Users.findById(id);

        if(!req.file){        
            //fires when we user upload the same coverPhoto cuz hes/shes an idiot
            if(req.body.imgUrl === user.coverPhoto) {
                const userData = {  
                    coverPhoto: req.body.imgUrl,
                }
                const result = await Users.findByIdAndUpdate(id, userData, {new: true}).select('-password -confirmPassword');
                return res.status(200).json({result});
            } 
            // fires when we dont want the image anymore
            await cloudinary.uploader.destroy(user.cloudinary_id_coverPhoto);
            const userData = {  
                coverPhoto: '',
                cloudinary_id_coverPhoto: '',
            }
            const result = await Users.findByIdAndUpdate(id, userData, {new: true}).select('-password -confirmPassword');
            return res.status(200).json({result});

        }else{
            //fires when we want to update image into a new one
            if(user.cloudinary_id_coverPhoto){
                await cloudinary.uploader.destroy(user.cloudinary_id_coverPhoto);
            }
            const cloudinary_data = await cloudinary.uploader.upload(req.file.path);
            const userData = {
                coverPhoto: cloudinary_data.secure_url,
                cloudinary_id_coverPhoto: cloudinary_data.public_id,
            }
                const result = await Users.findByIdAndUpdate(id,userData,{new: true}).select('-password -confirmPassword');
                return res.status(200).json({result});
        }

    }catch(error){
        res.status(409).json({errors: error.message});
        console.log(error.message);
    }
}

export const updateProfilePicture = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors: 'Invalid Id!'});
    if(req.user.id !== id) return res.status(403).json({errors: 'You cannot update other users profile!'})

    try{
        let user = await Users.findById(id);

        if(!req.file){        
            //fires when we user upload the same coverPhoto cuz hes/shes an idiot
            if(req.body.imgUrl === user.imageUrl) {
                const userData = {  
                    imageUrl: req.body.imgUrl,
                }
                const result = await Users.findByIdAndUpdate(id, userData, {new: true}).select('-password -confirmPassword');
                return res.status(200).json({result});
            } 
            // fires when we dont want the image anymore
            await cloudinary.uploader.destroy(user.cloudinary_id);
            const userData = {  
                imageUrl: '',
                cloudinary_id: '',
            }
            const result = await Users.findByIdAndUpdate(id, userData, {new: true}).select('-password -confirmPassword');
            return res.status(200).json({result});

        }else{
            //fires when we want to update image into a new one
            if(user.cloudinary_id){
                await cloudinary.uploader.destroy(user.cloudinary_id);
            }
            const cloudinary_data = await cloudinary.uploader.upload(req.file.path);
            const userData = {
                imageUrl: cloudinary_data.secure_url,
                cloudinary_id: cloudinary_data.public_id,
            }
                const result = await Users.findByIdAndUpdate(id,userData,{new: true}).select('-password -confirmPassword');
                return res.status(200).json({result});
        }
    }catch(error){
        res.status(409).json({errors: error.message});
    }
}


export const followUser = async (req,res) => {
    const {id} = req.params;
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({errors: "Error! Invalid id!"});

        //getting the user
        const user = await Users.findById(id);

        //checking the followers array and finding the id of the user
        const index =  user.followers.findIndex((userId) => String(userId.user) === String(req.user.id));
    
        //logic for following and unfollowing 
        const followFormat = {
            user: req.user.id,
        }
        if(index === -1 ){
             //executes when the user follow a user
            user.followers.push(followFormat);
        }else{
            // executes when the user unfollowing a user
            user.followers = user.followers.filter((id) => String(id.user) !== String(req.user.id));
        }

        const followUser = await Users.findByIdAndUpdate(id, user, {new:true}).select('followers');
        res.status(200).json({followUser});
}