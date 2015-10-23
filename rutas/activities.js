var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('underscore');

module.exports = function activities (app,Activity,io,mongoose){

	app.use(bodyParser.json());

	app.get('/activity', activitiesAll);
	app.post('/activity', insertActivity);
	app.put('/activity', updateActivity);


	function activitiesAll(req,res){
		Activity.find(function (err,array){
			res.json(array);
		});
	}

	function insertActivity(req, res) {
			actualActivity(req, function (err, activity) {
					if (err) return res.status(500).json(err);
					if (!_.size(activity)) {
							Activity.create({
									'adviser.adviserName': req.body.adviserName,
									'adviser.adviserLastName': req.body.adviserLastName,
									'adviser.adviserId': req.body.adviserId,
									'adviser.adviserEmail': req.body.adviserEmail,
									'day': moment(new Date()).format('YYYY-MM-DD'),
									'activity': {
											'activityEvent' : {
												eventCode: 10, eventName: 'closed'
											},
											'role' : {code: '1', name: 'servicio'},
											'activityStartTime': new Date(),
									}
							}, function(err, obj) {
									if (err) return res.status(500).json(err);
									res.json(obj);
							});
					}else{
						res.json(activity);
					}
			});
	}

	function actualActivity(req, callback) {
			var query = {};
			query.day = new Date(moment(new Date()).format('YYYY-MM-DD'));
			query['adviser.adviserId'] = req.body.adviserId;
			Activity.findOne(query, function(err, activity) {
					if (err) return callback(err, null);
					return callback(null, activity);
			});
	}

	function updateActivity(req, res){
			//console.log(data);
			var id = req.body.idActivity;
			var activity = {eventCode: req.body.eventCode, eventName: req.body.eventName};

			Activity.findByIdAndUpdate(id,{
				$push: {
						'activity': {
								'activityEvent' :	activity,
								'role' : {code: '1', name: 'servicio'},
								'activityStartTime': new Date()
				  	}
				}
			}, {new: true}, function(err, result){
					return res.json(result);
			});
	}

};
