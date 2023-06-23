const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategoriaSchema = Schema({
    nombreCategoria: {type: String, required: true}, 
    estado: {type: Boolean, required: true}
})

module.exports = mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);