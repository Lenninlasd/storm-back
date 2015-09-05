var bodyParser = require('body-parser');

module.exports = function circles (app,Circle,io,mongoose){

	app.use(bodyParser.json());

	var circlesAll = function(req,res){
		Circle.find(function (err,array){
			res.json(array);
		});
	};

	var circleById = function(req,res){
		var id = req.params.id;
		Circle.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	};

	app.get('/circles',circlesAll);
	app.get('/circles/:id',circleById);

};