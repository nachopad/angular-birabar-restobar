const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductoSchema = Schema({
    nombreProducto: {type: String, required: true},
    descripcion: {type:String, required:true},
    precio: {type:Number, required: true},
    estado: {type:Boolean, required: false},

})
module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);