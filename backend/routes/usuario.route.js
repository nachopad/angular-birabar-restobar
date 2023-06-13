//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de usuario.
router.get('/', usuarioCtrl.getUsuarios);
router.post('/', usuarioCtrl.createUsuario);
router.delete('/:id', usuarioCtrl.deleteUsuario);
router.put('/:id', usuarioCtrl.editUsuario);
router.get('/obtener-usuario/:id', usuarioCtrl.getUsuarioById);
//exportamos el modulo de rutas
module.exports = router;