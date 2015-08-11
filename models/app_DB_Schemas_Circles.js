var mongoose = require('mongoose');

var circleSchema = mongoose.Schema({
	greenCircle: [{// lista de agrupación de kpi (visualización)
		idGreenCircle: String,
		nameCircle: String,
		branchOffices:[{
			branchOfficesName:String,
			posCode:String,
			city:String,
			region:String,
			blueCircles: [{ // lista de circulos que generan turno
				idClircle: String,
				nameCircle: String,
				type: String
			}]
		}]
	}]
});

var Circle = mongoose.model('Circle', circleSchema, 'Circles');
module.exports = Circle;
