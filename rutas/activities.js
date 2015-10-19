var bodyParser = require('body-parser');

module.exports = function activities (app,Activity,io,mongoose){

	app.use(bodyParser.json());

	app.get('/activity', activitiesAll);
	app.post('/activity', insertActivity);


	function activitiesAll(req,res){
		Activity.find(function (err,array){
			res.json(array);
		});
	}

	function actualActivity(req, res) {
		// fecha del dia
		// id del asesor
	}

	function insertActivity(req, res) {
			console.log(req.body);
			Activity.create({
					'adviser.adviserName': req.body.adviserName,
					'adviser.adviserLastName': req.body.adviserLastName,
					'adviser.adviserId': req.body.adviserId,
					'adviser.adviserEmail': req.body.adviserEmail
					//insertar mas cosas
			}, function(err, obj) {
					if (err) return console.log(err);
					res.json(obj);
			});
	}

};
