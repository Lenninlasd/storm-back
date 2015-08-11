var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un servicio

var serviceSchema = mongoose.Schema({
	servicie:{
		serviceId:String,
		serviceName:String,
		numerador:String,
		categorie:String,
		subServices:[{
			subServiceId:String,
			subServiceName:String,
			description:String
		}]
	}

	});

var Servicie = mongoose.model('Servicie',serviceSchema,'services');

module.exports = Servicie;
