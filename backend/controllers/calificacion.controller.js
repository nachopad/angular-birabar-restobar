const Calificacion = require('./../models/calificacion');

const calificacionCtrl = {};

calificacionCtrl.createCalificacion = async (req, res) => {
    const calificacion = new Calificacion(req.body);

    try{
        await calificacion.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Calificacion guardada.'
        })
    }catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

calificacionCtrl.getCalificaciones = async (req, res) => {
    const calificaciones = await Calificacion.find();
    res.json(calificaciones);
}

module.exports = calificacionCtrl;