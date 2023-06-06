const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');


// Rutas de usuarios
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUsers);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.disableUser);

module.exports = router;
