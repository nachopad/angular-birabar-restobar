const calificacionCtrl = require('./../controllers/calificacion.controller');

const express = require('express');
const router = express.Router();

router.post('/', calificacionCtrl.createCalificacion);
router.get('/', calificacionCtrl.getCalificaciones);

module.exports = router;