const Categoria = require('./../models/categoria');
const Producto = require('./../models/producto');
const productoCtrl = require('./../controllers/producto.controller');

const categoriaCtrl = {};

categoriaCtrl.createCategoria = async (req, res) => {
    try{
        var categoria = new Categoria(req.body);
        await categoria.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Categoria guardada. '
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        res.json(categoria);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find( { estado: true } );
        res.json(categorias);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.updateCategoria = async (req, res) => {
    try{
        const categoria = new Categoria(req.body);
        await Categoria.updateOne({_id: req.body._id}, categoria);
        res.status(200).json({
            'status': '1',
            'msg': 'Categoria actualizada. '
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.deleteCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.id;
        await Categoria.findOneAndUpdate({_id: categoriaId}, {estado: false});

        // Eliminar los productos asociados a la categoría (eliminacion lógica)
        await Producto.updateMany({categoria: categoriaId}, {estado: false});

        res.status(200).json({
            'status': '1',
            'msg': 'Categoría y productos eliminados.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operación.'
        });
    }
};


module.exports = categoriaCtrl;