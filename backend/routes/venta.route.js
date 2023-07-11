const ventaCtrl = require('./../controllers/venta.controller.js');
const autCtrl = require('./../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.post('/', autCtrl.verifyToken, ventaCtrl.createVenta);
router.get('/all', autCtrl.verifyToken, ventaCtrl.getVentas);
router.get('/:id', autCtrl.verifyToken, ventaCtrl.getVentaById);
router.get('/filtrar/ventas', autCtrl.verifyToken, ventaCtrl.getVentasFiltradas);

module.exports = router;