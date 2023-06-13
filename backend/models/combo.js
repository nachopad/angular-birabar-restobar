const mongoose = require('mongoose');
const { Schema } = mongoose;
const ComboSchema = new Schema({
    titulo: { type: String, required: true },
    descuento: { type: Number, required: true },
    montoFinal: { type: Number, required: true },
    productos : [{type: Schema.Types.ObjectId, ref: 'Producto', required: true }],
    estado : {type: Boolean, required: true}
})
module.exports = mongoose.models.Combo || mongoose.model('Combo', ComboSchema);