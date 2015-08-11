var mongoose = require('mongoose'); 

var activitySchema = mongoose.Schema({

	asesor:{
		asesorName:String, 
		idAsesor:String,
		sucursal:{
			sucursalName:String, 
			posCode:Number,
			regional:String,

		}    	
	},
	actividad:[{
		idActivity:String,
		role: String,
		activityEvent:{	
			eventCode:String,
			eventName:String,
			transferTerminal:String,
		},
		terminal:String,
		activityStartTime:Date,
		activityEndTime:Date,
		activityTime:Number
	}]
});

var Activity= mongoose.model('Activity',activitySchema,'Activities');

module.exports = Activity;
