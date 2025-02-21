import multer from 'multer';
import path from 'path';

const upload = (type) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    if(type === 'single') {
        return multer({ storage: storage }).single('foto_usuario')
    } else if(type === 'multiple') {
        return multer({ storage }).fields([
            { name: 'foto_usuario', maxCount: 1 },
            { name: 'firma_usuario', maxCount: 1 },
            { name: 'foto_documento', maxCount: 1 },
            { name: 'foto_carnet', maxCount: 1 }
        ]);
    }
}

export default upload;