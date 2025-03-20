import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import parqueaderoRoutes from './routes/parqueaderoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(session({
    secret: 'clave',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

const corsOptions = {
    origin: 'http://localhost:3000', //URL de react
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', parqueaderoRoutes);
app.use('/api', reservaRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

