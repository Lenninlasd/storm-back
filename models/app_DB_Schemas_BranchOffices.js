var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con una Tienda
var branchOfficeSchema = mongoose.Schema({
	branchOffice:{
		branchOfficesName:String,
		posCode:String,
		city:String,
		region:String,
		blueCircles: [{ // lista de circulos que generan turno
			idClircle: String,
			nameCircle: String,
			type: String,
			termimals: [{
				terminalId: String,
				terminalName: String, //Nombre de la terminal.
				location: String //Campo con la dirección física de la terminal necesaria para enviar los mensajes al tablero individual.
			}]
		}],
		data: {
			type: String,
		}
	}
});

var BranchOffice = mongoose.model('BranchOffice',branchOfficeSchema,'branchOffices');

module.exports = BranchOffice;
