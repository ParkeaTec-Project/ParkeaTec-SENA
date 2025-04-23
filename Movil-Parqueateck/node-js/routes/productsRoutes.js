const productsController = require('../controllers/productsControllers');

module.exports = (app) => {
    app.get('/api/products', productsController.getProducts);
    app.get('/api/products/:id', productsController.getProductId);
    app.post('/api/products/create', productsController.createProduct);
    app.put('/api/products/update/:id', productsController.updateProduct);
    app.delete('/api/products/:id', productsController.deleteProduct);
}