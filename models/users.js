import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

//login schema

const userSchema = mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
       
    firstname: {
        type: String, 
        required: [true, 'Firstname Required!'], 
    },
    lastname: {
        type: String, 
        required: [true, 'Lastname Required!'], 
    },
    email: {
        type: String, 
        required: [true, 'Email required!'],
        unique: true, 
        validate: [validator.isEmail, 'Invalid email'],
    },
    followers:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            followedDate:{
                type: Date,
                default: Date.now
            }
        }
    ],
    confirmPassword: {
        type: String, 
        required: [true, 'Confirm Password is required'],
        minlength: [6, 'Password must be atleast 6 characters or numbers'], 
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be atleast 6 characters or numbers'],
    },
    imageUrl: {
        type:String,
    },
    cloudinary_id: {
        type: String,
    },
    coverPhoto: {
        type:String,
    },
    cloudinary_id_coverPhoto: {
        type: String,
    }

}, {timestamps: { createdAt: 'created_at' }});

userSchema.pre('save', async function(next){
   const salt = await  bcrypt.genSalt();

    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})

const User = mongoose.model('User', userSchema);

export default User;