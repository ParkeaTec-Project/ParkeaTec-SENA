const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
 module.exports = {
    login(req, res){
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async(err, MyUser) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Error al consultar el usuario',
                    error: err
                });
            }
            if(!MyUser){//Cliente sin autorización para realizar la petición
                return res.status(401).json({
                    success: false,
                    message: 'El email no existe en la base de datos'
                });
            }
            const isPasswordValid = await bcrypt.compare(password, MyUser.password);
            if(isPasswordValid){
                const token = jwt.sign({id: MyUser.id, email: MyUser.email}, keys.secretOrKey, {});

                const data = {
                    id: MyUser.id,
                    email: MyUser.email,
                    name: MyUser.name,
                    lastname: MyUser.lastname,
                    image: MyUser.image,
                    phone: MyUser.phone,
                    session_token: `JWT ${token}`
                }
                return res.status(201).json({
                    success: true,
                    message: 'Usuario Autenticado',
                    data: data
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña Incorrecta'
                });
            }
        });
    },

    register (req, res) {
        const user = req.body; // Datos del cliente
        User.create(user, (err, data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message:'Error al crear al usuario',
                    error: err

                });
            }
            return res.status(201).json ({
                success:true,
                message:'Usuario creado',
                data: data //Id del usuario
            });
        });
    }
 }