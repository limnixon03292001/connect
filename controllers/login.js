import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/users.js';
import cloudinary from '../middleware/cloudinary.js';



//Function that handles errors 
const handleErrors = (error) => {
    const errors = {firstname: '', lastname: '', email:'', confirmPassword:'', password:'',imageUrl: ''};
    if(error.code === 11000){
        errors.email = 'Email Already Exist!';
        return errors;
    }
    if(error.message.includes('User validation failed')){
       Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
       })
    }
    return errors;
}


export const login = async (req,res) => {
    const {email , password} = req.body;
    try{
        //Finding the user inside the database
        const user = await User.findOne({email});

        //fires when user doesn't exist
        if(!user){
            console.log("Incorrect email");
            return res.status(400).json({errors: {email: "Email not registered!"}});
        }

        const auth = await bcrypt.compare(password, user.password);

        //fires when password is incorrect
        if(!auth){
            console.log("Password is incorrect");
            return res.status(400).json({errors: {password: "Incorrect Password!"}});
        }

        //if all goods then create a token
        jwt.sign({email: user.email, id: user._id}, 'nixon29lols', {expiresIn: 3600}, (err,token) => {
            //if something unexpected happened in creating token
            if(err){
                return res.status(401).json({errors: 'Something went wrong...'});
            }
            //send the token
            res.status(200).json({ user: {
                id: user._id,
                email:user.email,
                firstName:user.firstname,
                lastName: user.lastname }, 
                token })
        } );

    }catch(error){
        // console.log(error);
        const errors = handleError(error);
        res.status(400).json({errors: errors})
    }
  
};

export const signUp = async (req ,res) => {
    try {
        if(!req.file) {
            const users = await new User({
                _id: mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                confirmPassword: req.body.confirmPassword,
                password: req.body.password,
                imageUrl: '',
                cloudinary_id: '', 
            });
            const result = await users.save();
            return res.status(201).json(result);
        }else{
            const cloudinary_data = await cloudinary.uploader.upload(req.file.path);
            const users = await new User({
                _id: mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                confirmPassword: req.body.confirmPassword,
                password: req.body.password,
                imageUrl: cloudinary_data.secure_url,
                cloudinary_id: cloudinary_data.public_id, 
            });
            const result = await users.save();
            return res.status(201).json(result);
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors: errors});  
    }
}

export const getUser = async (req,res) => {
    const userId = req.user.id;

    try{
        const result = await User.findById(userId.toString()).select('-password -confirmPassword')
        res.status(200).json({result});
    }catch(error){
        res.status(500).json({errors: 'Something wrong on the server'});
    }
}