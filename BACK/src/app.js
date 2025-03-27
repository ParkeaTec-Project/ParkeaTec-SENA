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
import notFoundHandler from './middleware/notFoundHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cookieParser());

import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' assert { type: 'json' };

const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const corsOptions = {
    origin: 'http://localhost:3000', //URL de react
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use('/api', userRoutes);
app.use('/api', parqueaderoRoutes);
app.use('/api', reservaRoutes);

app.use(notFoundHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

