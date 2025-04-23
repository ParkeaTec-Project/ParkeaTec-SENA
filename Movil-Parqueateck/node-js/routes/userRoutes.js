const UserController = require('../controllers/usersControllers');

module.exports = (app) => {
    app.post('/api/users/create', UserController.register);
    app.post('/api/users/login', UserController.login);
}