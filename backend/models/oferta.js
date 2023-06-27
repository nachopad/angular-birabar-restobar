const mongoose = require('mongoose');
const { Schema } = mongoose;
const Producto = require('./producto');

const OfertaSchema = new Schema({
    titulo: { type: String, required: true },
    estado: { type: Boolean, required: true },
    dias: [{ type: String, required: true}],
    desde: { type: String, required: true },
    hasta: { type: String, requiered:true },
    productos: [{ type: Schema.Types.ObjectId, ref: Producto, required: true }]
})

module.exports = mongoose.models.Oferta || mongoose.model('Oferta', OfertaSchema);