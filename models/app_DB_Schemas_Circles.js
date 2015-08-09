var mongoose = require('mongoose');

var circleSchema = mongoose.Schema({
	greenCircle: [{// lista de agrupación de kpi (visualización)
		idGreenCircle: String,
		nameCircle: String,
		branchOffices:[{
			nombreSucursal:String,
			codigoPos:String,
			ciudad:String,
			regional:String,
			blueCircles: [{ // lista de circulos que generan turno
				idClircle: String,
				nameCircle: String,
				type: String
			}]
		}]
}]
});

var Circle = mongoose.Model('circle', circleSchema,'circlecollection');

module.exports = Circle;
