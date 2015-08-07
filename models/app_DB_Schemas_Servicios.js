var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un servicio

var servicioSchema = mongoose.Schema({
	servicio:{
		sid:String,
		nombre:String,
		numerador:String,
		categoria:String,
		subServicios:[{
			subSerId:String,
			nombreSubservicio:String,
			descripcion:String
		}]
	}

	});

var Servicio = mongoose.model('Servicio',servicioSchema,'servicios');

module.exports = Servicio;
