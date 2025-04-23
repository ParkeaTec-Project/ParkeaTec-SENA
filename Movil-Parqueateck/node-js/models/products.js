const db = require('../config/config');
const bcrypt = require('bcryptjs');
const products = {};

products.getAllProducts = (response) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.log('Error al consultar: ', err);
            response(err, null);
        } else {
            console.log('Productos consultados: ', results);
            response(null, results);
        }
    })
};

products.getProductById = (id, response) => {
    const sql = 'SELECT * FROM products WHERE id = ?;';
    db.query(sql, [id], (err, results) => {
        if(err) {
            console.log('Error al consultar: ', err);
            response(err, null);
        } else {
            console.log('Producto consultado: ', results);
            response(null, results)
        }
    })
};

products.createProduct = (name, price, response) => {
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], (err, results) => {
        if(err) {
            console.log('Error al crear: ', err);
            response(err, null);
        } else {
            console.log('Producto creado: ', results);
            response(null, results);
        }
    })
};

products.updateProduct = (id, name, price, response) => {
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [name, price, id], (err, results) => {
        if(err) {
            console.log('Error al actualizar: ', err);
            response(err, null);
        } else {
            console.log('Producto actualizado: ', results);
            response(null, results);
        }
    })
};

products.deleteProduct = (id, response) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if(err){
            console.log('Error al eliminar: ', err);
            response(err, null);
        } else {
            console.log('Producto eliminado: ', results);
            response(null, results);
        }
    })
};

module.exports = products;