import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import parqueaderoRoutes from './routes/parqueaderoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import vehiculoRoutes from './routes/vehiculoRoutes.js'
import strikesRoutes from './routes/strikesRoutes.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
//console.log(JSON.stringify(swaggerSpec, null, 2))
// Configuracion de rutas de archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

// Configuracion CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://192.168.20.16:4000'], //URL de react
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));


app.use(cookieParser());
app.use(bodyParser.json());

// Se usa '../uploads' porque la carpeta esta al mismo nivel que /src
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
    setHeaders: (res) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Cache-Control', 'public, max-age=31536000');
    }
}));

//const __filenameS = fileURLToPath(import.meta.url);
//const __dirnameS = path.dirname(__filenameS);
//const swaggerDocumentation = JSON.parse(fs.readFileSync(path.join(__dirnameS, './swagger.json'), 'utf-8'));
//const swaggerDocumentation = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));
//import swaggerDocumentation from './swagger.json' assert { type: 'json' };
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


//Rutas API
app.use('/api', userRoutes);
app.use('/api', parqueaderoRoutes);
app.use('/api', reservaRoutes);
app.use('/api', vehiculoRoutes);
app.use('/api', strikesRoutes);

// Middleware para rutas no encontradas 
app.use(notFoundHandler);

// Inicio servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Ruta de uploads: ${path.join(__dirname, 'uploads')}`);
});