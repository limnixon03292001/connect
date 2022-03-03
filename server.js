import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRouter from './routes/login.js';
import usersRouter from './routes/users.js';
import postRouter from './routes/post.js';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const app = express();
//since im using modules, we cant access __dirname when using modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(cors());
app.use(express.json({limit: '30mb'}));
app.use(compression({
    level: 8,
    filter:(req,res) => {
        if(req.headers['x-no-compression']){
            return false
        }

        return compression.filter(req,res);
    }
}))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use('/login', loginRouter); //login user
app.use('/users', usersRouter); //all users
app.use('/post', postRouter); //post

if(process.env.NODE_ENV === "production"){ 
    app.use(express.static("client/build"));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening on port 5000'); 
});


