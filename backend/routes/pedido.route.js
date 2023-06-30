//defino controlador para el manejo de CRUD
const pedidoCtrl = require('./../controllers/pedido.controller.js');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.post('/', pedidoCtrl.createPedido);
router.get('/all', pedidoCtrl.getPedidos);
router.get('/id/:id', pedidoCtrl.getPedidoId);
router.get('/filtrar', pedidoCtrl.getPedidosEstado);
router.put('/modificar', pedidoCtrl.editPedido);
router.delete('/eliminar/:id', pedidoCtrl.deletePedido);

//exportamos el modulo de rutas
module.exports = router;