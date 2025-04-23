const products = require('../models/products');
module.exports = {
    getProducts(req, res) {
        products.getAllProducts((err, results) => {
            if(err) throw err;
            res.json(results);
        });
    },

    getProductId(req, res) {
        const { id } = req.params;
        products.getProductById(id, (err, results) => {
            if(err) throw err;
            res.json(results[0]);
        })
    },

    createProduct(req, res) {
        const { name, price } = req.body;
        products.createProduct(name, price, (err, results) => {
            if(err) throw err;
            res.json({ id: results.insertId, name, price });
        })
    }, 

    updateProduct(req, res) {
        const { id } = req.params;
        const { name, price } = req.body;
        products.updateProduct(id, name, price, (err, results) => {
            if(err) throw err;
            res.json({ id, name, price})
        })
    },

    deleteProduct(req, res) {
        const { id } = req.params;
        products.deleteProduct(id, (err, results) => {
            if(err) throw err;
            res.json({message: "Eliminado id: " + id});
        })
    }
};