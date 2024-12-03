import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

const app = express();
const port = 4000;

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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

