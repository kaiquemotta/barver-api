const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getUsuarios);

router.get('/:id', userController.getUsuarioById);

router.get('/email/:email', userController.getUsuarioByEmail);

router.post('/', userController.createUsuario);

router.put('/:id', userController.updateUsuario);

router.delete('/:id', userController.deleteUsuario);

module.exports = router;