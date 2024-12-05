import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
}).fields([
    { name: 'foto_usuario', maxCount: 1 },
    { name: 'firma_usuario', maxCount: 1 },
    { name: 'foto_documento', maxCount: 1 },
    { name: 'foto_carnet', maxCount: 1 }
]);

export default upload;