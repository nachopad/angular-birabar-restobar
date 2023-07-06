const whatsappCtrl = require('./../controllers/whatsapp.controller');
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.post('/iniciar', whatsappCtrl.createSession);
router.post('/send', whatsappCtrl.sendMessage);


module.exports= router;