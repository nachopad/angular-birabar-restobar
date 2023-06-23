const Cliente = require('../models/cliente');
const Usuario = require('../models/usuario');

/**
 * Controlador para gestionar clientes.
 * @namespace clienteCtrl
 */
const clienteCtrl = {}

/**
 * Crea un nuevo cliente.
 * @async
 * @function createCliente
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se guarda el cliente y se envía la respuesta.
 */
clienteCtrl.createCliente = async (request, response) => {
    request.body.estado = true;
    var cliente = new Cliente(request.body);
    try {
        await cliente.save();
        response.status(201).json({
            status: '1',
            msg: 'Cliente creado y guardado exitosamente.'
        })
    } catch (error) {
        response.status(400).json({
            status: '0',
            msg: 'Error procesando operacion.'
        })
    }
}

/**
 * Elimina un cliente existente.
 * @function deleteCliente
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se elimina el cliente y se envía la respuesta.
 */
clienteCtrl.deleteCliente = async (request, response) => {
    try {
        const cliente = await Cliente.findOne({ _id: request.params.id }).populate('usuario');
        const usuario = await Usuario.findOne({ _id: cliente.usuario._id });
        usuario.estado = false;
        await usuario.save();

        response.json({
            status: '1',
            msg: 'Cliente eliminado exitosamente.'
        });
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error eliminando el cliente',
            error: error.message,
        });
    }
}

/**
 * Modifica un cliente existente.
 * @function editCliente
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se modifica el cliente y se envía la respuesta.
 */
clienteCtrl.editCliente = async (request, response) => {
    const vacliente = new Cliente(request.body);
    try {
        await Cliente.updateOne({ _id: request.body._id }, vacliente);
        response.json({
            status: '1',
            msg: 'Cliente modificado exitosamente.'
        });
    }
    catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error modificado el cliente.',
            error: error.message
        });
    }
}

/**
 * Obtiene todos los clientes activos.
 * @function getClientes
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtienen los clientes y se envía la respuesta.
 */
clienteCtrl.getClientes = async (request, response) => {
    try{
        var clientes = await Cliente.find().populate({ path: 'usuario', populate: { path: 'rol' } });
        response.json(clientes);
    }
    catch (error) {
    response.status(500).json({
      status: '0',
      msg: 'Error obteniendo todos los clientes.',
      error: error.message
    });
  }
}

/**
 * Obtiene un cliente existente por su ObjectId.
 * @function getClienteById
 * @param {Object} request - Objeto de solicitud de Express.
 * @param {Object} response - Objeto de respuesta de Express.
 * @returns {Promise<void>} Una promesa que resuelve cuando se obtiene el cliente y se envía la respuesta.
 */
clienteCtrl.getClienteById = async (request, response) => {
    try {
        const cliente = await Cliente.findOne({ _id: request.params.id, estado:true }).populate('usuario');
        response.json(cliente);
    }
    catch (error) {
        response.status(500).json({
            status: '0',
            msg: 'Error obteniendo el cliente.',
            error: error.message
        });
    }
}

module.exports = clienteCtrl;