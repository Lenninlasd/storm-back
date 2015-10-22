var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({

	adviser:{
		adviserName:String,
		adviserLastName:String,
		adviserId:String,
		adviserEmail: String
	},
	day: Date,
	activity:[{
		idActivity:String,
		role: {
			code: String,
			name: String
		},
		activityEvent: {
			eventCode:String, // {generateToken: 0, callToken: 1, attendToken: 2, available: 3, close: {closed: 10, bath=100, breack=101, lunch=102}
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

var Activity= mongoose.model('Activity',activitySchema,'activities');

module.exports = Activity;
