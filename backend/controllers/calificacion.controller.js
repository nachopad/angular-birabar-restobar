const Calificacion = require('./../models/calificacion');

const calificacionCtrl = {};

calificacionCtrl.createCalificacion = async (req, res) => {
    const calificacion = new Calificacion(req.body);

    try{
        await calificacion.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Calificacion guardada.',
            calificacion
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

calificacionCtrl.getResumen = async (req, res) => {
    const calificaciones = await Calificacion.aggregate(
        [
            { $group: { _id: '$puntaje', count: { $sum: 1 } } },
            { $project: { puntaje: '$_id', count: 1, _id: 0 } },
            { $sort: { puntaje: 1 } }
          ]
    ) 
    res.json(calificaciones);
}

calificacionCtrl.getCalificacionFiltradas = async (req, res) => {
    const { fechaDesde, fechaHasta} = req.query;

    try {
        let filtro = {};

        if (fechaDesde && fechaHasta) {
            filtro.fecha = {
                $gte: fechaDesde,
                $lte: fechaHasta
            };
        } else if (fechaDesde) {
            filtro.fecha = {
                $gte: fechaDesde
            };
        } else if (fechaHasta) {
            filtro.fecha = {
                $lte: fechaHasta
            };
        }
   
        const resumenCalificaciones = await Calificacion.aggregate([
          {
            $match: filtro
          },
          {
            $group: {
              _id: '$puntaje',
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              puntaje: '$_id',
              count: 1,
              _id: 0
            }
          },
          {
            $sort: {
              puntaje: 1
            }
          }
        ]);

        res.json(resumenCalificaciones);
    } catch (error) {
        console.error('Error al filtrar las ventas:', error);
        res.status(500).json({ message: 'Error al filtrar las ventas' });
    }
};  

module.exports = calificacionCtrl;