var bodyParser = require('body-parser');

module.exports = function activities (app,Activity,io,mongoose){

	app.use(bodyParser.json());

	var activitiesAll = function(req,res){
		Activity.find(function (err,array){
			res.json(array);
		});
	};

	app.get('/activities',activitiesAll);

};