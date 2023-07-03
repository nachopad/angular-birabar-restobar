const Pedido = require('../models/pedido');

const pedidoCtrl = {};

pedidoCtrl.createPedido = async (req, res) => {
    //req.body.estado = "Pendiente";
    //req.body.demora = "45 min";

    var pedido = new Pedido(req.body);

    try {
        await pedido.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Pedido guardado.',
            pedido
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

pedidoCtrl.getPedidos = async (req, res) => {
    const pedidos = await Pedido.find().populate('cliente').populate({ path: 'detalleProductos', populate: { path: 'producto' } }).populate('calificacion');
    res.json(pedidos);
}

pedidoCtrl.getPedidosCliente = async (req, res) => {
    const pedidos = await Pedido.find({ cliente: req.params.idCliente }).populate('cliente').populate({ path: 'detalleProductos', populate: { path: 'producto' } }).populate('calificacion');
    res.json(pedidos);
}

pedidoCtrl.getPedidoId = async (req, res) => {
    const pedido = await Pedido.findById({ _id: req.params.id }).populate('cliente').populate({ path: 'detalleProductos', populate: { path: 'producto' } }).populate('calificacion');
    res.json(pedido);
}

pedidoCtrl.getPedidosEstado = async (req, res) => {
    try {
        const estado = req.query.estado;
        const pedidos = await Pedido.find({ estado }).populate('cliente').populate({ path: 'detalleProductos', populate: { path: 'producto' } }).populate('calificacion');
        res.json(pedidos);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.',
        });
    }
}

pedidoCtrl.editPedido = async (req, res) => {
    const pedido = req.body;
    try {
        await Pedido.updateOne({ _id: pedido._id }, pedido);
        res.json({
            status: '1',
            msg: 'Pedido modificado.'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.',
        });
    }
}

pedidoCtrl.deletePedido = async (req, res) => {
    try {
        await Pedido.findOneAndUpdate({_id: req.params.id}, {estado: "Cancelado", demora: "-"});

        res.status(200).json({
            'status': '1',
            'msg': 'Pedido eliminado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
}

module.exports = pedidoCtrl;