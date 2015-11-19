var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('underscore');

module.exports = function gtrActivities(app,Activity,io,mongoose){

	app.use(bodyParser.json());

	app.get('/activityGtr', actualActivity);

	function actualActivity(req, res) {
			var query = {};
			query.day = new Date(moment(new Date()).format('YYYY-MM-DD'));

			// Activity.find(query, function(err, activity) {
            //         if (err) return res.status(500).json(err);
            //         console.log(activity);
			// 		res.json(activity);
			// });

            Activity.aggregate([

                { $match: query	},
                { $project: {'adviser.adviserEmail': 1, 'activity.activityStartTime' : 1, 'activity.activityEndTime': 1, 'activity.activityEvent': 1}}
            ], function (err, rows) {
                if (err) return res.status(500).json(err);
                res.json(rows);
            });
	}

};
