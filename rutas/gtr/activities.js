var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('underscore');
var Token = require('../../models/app_DB_Schemas_Tokens');

module.exports = function gtrActivities(app,Activity,io,mongoose){

	app.use(bodyParser.json());

	app.get('/activityGtr', actualActivity);
	app.get('/actualCustomerGtr', actualCustomer);

	function actualActivity(req, res) {
			if (!req.query.room) return res.status(400).json({msg:'bad query'});
			var gtr = {};

			findActiveAdviser(req.query.room, function (err, dataAdviser) {
					if (err) return res.status(500).json(err);
					gtr.adviser = dataAdviser;

					findActiveCustomer(req.query.room, function (err, dataCustomer) {
							if (err) return res.status(500).json(err);
							gtr.customer = dataCustomer;
							res.json(gtr);
					});
			});
	}

	function actualCustomer(req, res) {
			if (!req.query.room) return res.status(400).end();

			findActiveCustomer(req.query.room, function (err, data) {
					if (err) return res.status(500).json(err);
					res.json(data);
			});
	}

	function findActiveAdviser(room, callback) {
			room = room || '93';
			if (!room) return callback(null, null);

				Activity.aggregate(
					[
						{	$match: {
								day: new Date(moment(new Date()).format('YYYY-MM-DD'))
							}
						},
						{	$unwind: "$activity"},
						{ $match: {
									'activity.branchOffice.posCode' : room,
									"activity.activityEndTime" : new Date(0),
									'activity.activityEvent.eventCode' : { $ne: '10' }
								}
						},
						{ $sort: {'activity.activityStartTime': 1}}
						// {$limit: 1}
				], function (err, data) {
							if (err) return callback(err, null);
							return callback(null, data);
				});
	}
	function findActiveCustomer(room, callback) {
			// var query = {};

			Token.find({  //0 = pending, 1 = calling, 2 = in attention,
					'token.state.stateCode' : { $in: [0, 1, 2] },
					'token.infoToken.logCreationToken' : {$gte: new Date(moment(new Date()).format('YYYY-MM-DD'))},
					'token.branchOffice.posCode' : room
			}, function (err, results){
					if (err) return callback(err, null);
					return callback(null, results);
			});
	}
};
