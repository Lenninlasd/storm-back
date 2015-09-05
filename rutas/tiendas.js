var bodyParser = require('body-parser');

module.exports = function tiendas (app,Tienda,io,mongoose){

	app.use(bodyParser.json());

	var tiendasAll = function(req,res){
		Tienda.find(function (err,array){
			res.json(array);
		});
	};

	var tiendaById = function(req,res){
		var id = req.params.id;
		Tienda.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	};

	var newTienda = function(req,res){
		console.log(req.body);
		Tienda.create({
			'branchOffice.branchOfficesName':req.body.branchOfficesName,
			'branchOffice.posCode':req.body.posCode,
			'branchOffice.city':req.body.city,
			'branchOffice.region':req.body.region,
			'branchOffice.data.type':req.body.tipo 
		},function (err,obj){
			res.json(obj);
		});

	};

	var editTienda = function(req,res){
		var id = req.params.id;
		Tienda.findByIdAndUpdate(id,{
			'branchOffice.branchOfficesName':req.body.branchOfficesName,
			'branchOffice.posCode':req.body.posCode,
			'branchOffice.city':req.body.city,
			'branchOffice.region':req.body.region,
			'branchOffice.data.type':req.body.tipo 
		},
		{new:true},function (err,obj){
			res.json(obj);
		});

	};

	var deleteTienda = function(req,res){
		var id = req.params.id;
		Tienda.findByIdAndRemove(id, function (err){
			res.json('se elimino el doc');
		});

	};


	app.get('/tiendas',tiendasAll);
	app.get('/tiendas/:id',tiendaById);
	app.post('/tiendas',newTienda);
	app.put('/tiendas/:id',editTienda);
	app.delete('/tiendas/:id',deleteTienda);

};