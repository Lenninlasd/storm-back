var mongoose = require('mongoose'); 

var activitySchema = mongoose.Schema({

	asesor:{
		nombre_aesesor:String, 
		id_asesor:String,
		sucursal:{
			nombre_sucursal:String, 
			codigo_pos:Number,
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
