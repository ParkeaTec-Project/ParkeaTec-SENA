import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticateToken = (req, res, next) => {
    console.log('Cookies recibidas:', req.cookies);
    let token = req.cookies.authToken;

    if(!token) {
        return res.status(401).json({
            message: 'Token no proporcionado'
        })
    }
    
    if (token.includes(';')) {
        token = token.split(';')[0].trim();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.clearCookie('authToken');
            return res.status(403).json({
                message: 'Token invalido o expirado'
            })
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;