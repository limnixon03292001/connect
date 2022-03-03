import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    _id:   mongoose.Schema.Types.ObjectId,
    users: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    description:{
        type:String,
    },
    postImg: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    likes: { type: [String], default: [] },
    comment: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            commentData: {type: String},
            commentDate: {type:Date, default: Date.now},
        }
    ],
    postDate: {
        type: Date,
        default: Date.now
    },
}, {timestamps: { createdAt: 'created_at' }});

const Post = mongoose.model('Post', postSchema);

export default Post;