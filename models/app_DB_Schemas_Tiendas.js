var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con una Tienda
var tiendaSchema = mongoose.Schema({
	tienda:{
		nombre_sucursal:String,
		codigo_pos:String,
		ciudad:String,
		regional:String
	}
});

var Tienda = mongoose.model('Tienda',tiendaSchema,'TodosTiendas');

module.exports = Tienda ;