const calificacionCtrl = require('./../controllers/calificacion.controller');

const express = require('express');
const router = express.Router();

router.post('/', calificacionCtrl.createCalificacion);
router.get('/', calificacionCtrl.getCalificaciones);
router.get("/resumen", calificacionCtrl.getResumen);
module.exports = router;