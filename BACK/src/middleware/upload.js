import multer from 'multer';
import path from 'path';
import { uploadConfigs } from '../config/upload.config.js';

const upload = (configKey) => {
    // obtener las configuraciones correspondientes
    const config = uploadConfigs[configKey];

    if(!config) {
        throw new Error(`Configuracion de upload no encontrada para key: ${configKey}`);

    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${config.folder}/`);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

   const multerOptions = { storage };

   switch (config.type) {
    case 'single':
        if (!config.fieldName) {
            throw new Error('Se requiere "fieldName" para tipo "single"');
        }
        return multer(multerOptions).single(config.fieldName);
    case 'multiple':
        if (!config.fields || !Array.isArray(config.fields)) {
            throw new Error('Se requiere "fields" (array) para tipo "multiple"');
        }
        return multer(multerOptions).fields(config.fields);
    default:
        throw new Error(`Tipo de upload no soportado: ${config.type}`);
}
}

export default upload;