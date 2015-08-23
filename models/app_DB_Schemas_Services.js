var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un servicio

var serviceSchema = mongoose.Schema({
	servicie:{
		serviceId:String,
		serviceName:String,		
		subServices:[{
			subServiceId:String,
			subServiceName:String,
			description:String,
			numerador:String,
			categorie:String
		}]
	}

	});

var Service = mongoose.model('Servicie',serviceSchema,'services');

module.exports = Service;
