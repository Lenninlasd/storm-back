var mongoose = require('mongoose'); 

var activitySchema = mongoose.Schema({

	asesor:{
		asesorName:String, 
		idAsesor:String,   	
	},
	actividad:[{
		idActivity:String,
		role: String,
		activityEvent:{	
			eventCode:String,
			eventName:String,
			transferTerminal:String,
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
		activityStartTime:Date,
		activityEndTime:Date,
		activityTime:Number
	}]
});

var Activity= mongoose.model('Activity',activitySchema,'Activities');

module.exports = Activity;
