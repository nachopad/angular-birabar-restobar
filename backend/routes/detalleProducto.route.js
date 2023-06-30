const detProductoCtrl = require('./../controllers/detalleProducto.controller.js');

const express = require('express');
const router = express.Router();

router.post('/', detProductoCtrl.createDetalleProducto);
router.get('/all', detProductoCtrl.getDetalleProducto);
router.get('/:id', detProductoCtrl.getDetalleProductoId);
router.put('/modificar', detProductoCtrl.editDetalleProducto);
router.delete('/eliminar/:id', detProductoCtrl.deleteDetalleProducto);

module.exports = router;