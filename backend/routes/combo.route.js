//defino controlador para el manejo de CRUD
const comboCtrl = require('./../controllers/combo.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de usuario.
router.get('/', comboCtrl.getCombos);
router.post('/', comboCtrl.createCombo);
router.delete('/:id', comboCtrl.deleteCombo);
router.put('/:id', comboCtrl.editCombo);
router.get('/obtener-combo/:id', comboCtrl.getComboById);
//exportamos el modulo de rutas
module.exports = router;