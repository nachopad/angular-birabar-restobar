const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');
var app = express();

//middlewares
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/cliente', require('./routes/cliente.route.js'));
app.use('/api/apiProducto', require('./routes/producto.route.js'));
app.use('/api/oferta', require('./routes/oferta.route.js'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});