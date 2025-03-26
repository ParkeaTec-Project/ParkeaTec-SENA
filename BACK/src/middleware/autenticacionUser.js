function autenticacionUser (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Acceso no autorizado" })
    }
}

export default autenticacionUser;