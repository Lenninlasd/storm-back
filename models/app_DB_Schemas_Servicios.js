var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un servicio

var servicioSchema = mongoose.Schema({
	servicio:{
		nombre:String,
		sid:String,
		subServicios:[{
			subSerId:String,
			nombreSubservicio:String,
			descripcion:String,
			numerador:String,
			categoria:String
		}]
	}

	});

var Servicio = mongoose.model('Servicio',servicioSchema,'servicios');

module.exports = Servicio;
