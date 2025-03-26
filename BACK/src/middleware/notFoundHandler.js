export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada. Verifica la URL y el metodo HTTP"
    });
};

export default notFoundHandler;