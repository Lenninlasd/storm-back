var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un servicio

var servicioSchema = mongoose.Schema({	
	servicio:{ 
		nombre:String,
		sid:String,
		sub_servicios:[{
			nombre_subservicio:String,
			descripcion:String,
			numerador:String,
			categoria:String
		}]
	}
		
	});

var Servicio = mongoose.model('Servicio',servicioSchema,'TodosServicios');

module.exports = Servicio;