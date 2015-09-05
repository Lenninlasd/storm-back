var bodyParser = require('body-parser');

module.exports = function services (app,Service,io,mongoose){

	app.use(bodyParser.json());

	var servicesAll = function(req,res){
		Service.find(function (err,array){
			res.json(array);
		});
	};

	var serviceById = function(req,res){
		var id = req.params.id;
		Service.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	};

	var newService = function(req,res){
		console.log(req.body);
		Service.create({
			'servicie.serviceId':req.body.serviceId,
			'servicie.serviceName':req.body.serviceName,
			'servicie.subServices':req.body.subServices
		},function (err,obj){
			res.json(obj);
		});
	};

	var editService= function(req,res){
		var id = req.params.id;
		Service.findByIdAndUpdate(id,{
			'servicie.serviceId':req.body.serviceId,
			'servicie.serviceName':req.body.serviceName,
			'servicie.subServices':req.body.subServices			 
		},
		{new:true},function (err,obj){
			res.json(obj);
		});

	};

	var deleteService = function(req,res){
		var id = req.params.id;
		Service.findByIdAndRemove(id, function (err){
			res.json('se elimino el doc');
		});

	};


	app.get('/services',servicesAll);
	app.get('/services/:id',serviceById);
	app.post('/services',newService);
	app.put('/services/:id',editService);
	app.delete('/service/:id',deleteService);



};