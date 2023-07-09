const Venta = require('./../models/venta');
const Cliente = require('./../models/cliente')

const ventaCtrl = {};

ventaCtrl.createVenta = async (req, res) => {
    const venta = new Venta(req.body);

    try {
        await venta.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Pedido guardado.',
            venta
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

ventaCtrl.getVentas = async (req, res) => {
    const ventas = await Venta.find().populate({ path: 'pedido', populate: { path: 'cliente', populate: 'usuario' } })
        .populate({ path: 'pedido', populate: { path: 'calificacion' } })
        .populate({ path: 'pedido', populate: { path: 'detalleProductos', populate: { path: 'producto', populate: { path: 'categoria' } } } });
    res.json(ventas);
}

ventaCtrl.getVentaById = async (req, res) => {
    const venta = await Venta.find({ _id: req.params.id }).populate({ path: 'pedido', populate: { path: 'cliente', populate: 'usuario' } })
        .populate({ path: 'pedido', populate: { path: 'calificacion' } })
        .populate({ path: 'pedido', populate: { path: 'detalleProductos', populate: { path: 'producto', populate: { path: 'categoria' } } } });
    res.json(venta);
}

ventaCtrl.getVentasFiltradas = async (req, res) => {
    const { fechaDesde, fechaHasta, usuario } = req.query;

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

        if (usuario) {
            filtro = {
                ...filtro,
                'pedido.cliente.usuario.user': usuario
            };
        }     

        const ventasFiltradas = await Venta.aggregate([
            {
                $lookup: {
                    from: 'pedidos',
                    localField: 'pedido',
                    foreignField: '_id',
                    as: 'pedido'
                }
            },
            {
                $unwind: '$pedido'
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'pedido.cliente',
                    foreignField: '_id',
                    as: 'pedido.cliente'
                }
            },
            {
                $unwind: '$pedido.cliente'
            },
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'pedido.cliente.usuario',
                    foreignField: '_id',
                    as: 'pedido.cliente.usuario'
                }
            },
            {
                $unwind: '$pedido.cliente.usuario'
            },
            {
                $match: filtro
            }
        ]);

        await Venta.populate(ventasFiltradas, {
            path: 'pedido',
            populate: [
                { path: 'cliente', populate: { path: 'usuario' } },
                { path: 'calificacion' },
                { path: 'detalleProductos', populate: { path: 'producto', populate: { path: 'categoria' } } }
            ]
        });        
        
        res.json(ventasFiltradas);
    } catch (error) {
        console.error('Error al filtrar las ventas:', error);
        res.status(500).json({ message: 'Error al filtrar las ventas' });
    }
};  

module.exports = ventaCtrl;