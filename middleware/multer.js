import multer from 'multer';
import path from 'path';

const multerUpload= multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported!"), true);
            return;
        }
        cb(null, true);
    },
});


export default multerUpload;