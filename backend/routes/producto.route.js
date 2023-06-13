//defino controlador para el manejo de CRUD
const productoCtrl = require('./../controllers/producto.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', productoCtrl.getProductos);
router.post('/producto', productoCtrl.createProducto);
router.put('/producto/:id', productoCtrl.deleteProducto); //Eliminacion Logica
router.put('/producto', productoCtrl.editProducto);	
router.get('/obtener-producto/:id', productoCtrl.getProducto); //Busca Producto por id

//exportamos el modulo de rutas
module.exports = router;