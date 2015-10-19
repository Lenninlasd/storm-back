var mongoose = require('mongoose');

// Esquema que define totalmente toda la información que se realciona con un turno.
var tokenSchema = mongoose.Schema({
	token:{
		idToken: {
			numerator: String,
			consecutive: Number
		},
		state: {
			stateCode: Number, // 0 = pending, 1 = calling, 2 = in attention, 3 = closed, 4 = abandoned, 5 = canceled
			description: String
		},
		// Proceso de toma de turno por parte del cliente.
		motivoVisita: {
			serviceName:String,
			serviceId:String
		},
		// Datos de la Asesor-Terminal y Tienda donde se ateinde al turno
		emitterAdviser:{
				adviserName:String,
				adviserLastName:String,
				adviserId:String,
				adviserEmail: String
		},
		receiverAdviser:{
				adviserName:String,
				adviserLastName:String,
				adviserId:String,
				adviserEmail: String
		},
		branchOffice:{
				branchOfficesName:String,
				posCode:Number,
				city:String,
				region:String,
				blueCircle: {
					idClircle: String,
					nameCircle: String,
					type: String,
					termimal: {
						terminalId: String,
						terminalName: String,
						location: String
					}
				}
		},
		// Datos del Cliente Atendido.
		client:{
				lineNumber:Number,
				screenName:String,
				clientName:String,
				idNumber:Number,
				idType:String
		},
		// Datos de la atencion al turno
		infoToken:{
				logCreationToken:Date,
				logCalledToken:Date, // Date
				logAtentionToken:Date,
				logEndToken:Date, // Date
				area:String,
				clientCategorie:String,
				services: [{
					serviceName:String,
					serviceId:String,
					subServices:[{
						subServiceId:String,
						subServiceName:String,
						description:String,
						numerator:String,
						categorie:String
					}]
				}],
				observation:String
		}
	}
});

var Token = mongoose.model('Token',tokenSchema,'tokens');

module.exports = Token;
