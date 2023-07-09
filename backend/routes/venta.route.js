const ventaCtrl = require('./../controllers/venta.controller.js');

const express = require('express');
const router = express.Router();

router.post('/', ventaCtrl.createVenta);
router.get('/all', ventaCtrl.getVentas);
router.get('/:id', ventaCtrl.getVentaById);
router.get('/filtrar/ventas', ventaCtrl.getVentasFiltradas);

module.exports = router;