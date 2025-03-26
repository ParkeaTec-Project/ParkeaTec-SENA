function autenticacion (req, res, next) {
    if(!req.params.id) {
        return res.status(400).json({ message: "Falta ID de usuario" });
    }
    next();
}

export default autenticacion;