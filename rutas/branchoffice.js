var bodyParser = require('body-parser');

module.exports = function tiendas (app,Tienda,io,mongoose){

	app.use(bodyParser.json());

	app.get('/branchOffice',branchOffice);
	app.get('/tiendas/:id',tiendaById);
	app.post('/tiendas',newTienda);
	app.put('/tiendas/:id',editTienda);
	app.delete('/tiendas/:id',deleteTienda);

	function branchOffice(req,res){
		// En futuro debe poder filtrarse por region, o circulo azul, verde etc,
		// y limitar un numero max de rows
		// filtro obligatorio de empresa*
		Tienda.find(function (err,array){
			res.json(array);
		});
	}

	function tiendaById(req,res){
		var id = req.params.id;
		Tienda.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	}

	function newTienda(req,res){
			Tienda.create({
					'branchOffice.branchOfficesName':req.body.branchOfficesName,
					'branchOffice.posCode':req.body.posCode,
					'branchOffice.city':req.body.city,
					'branchOffice.region':req.body.region,
					'branchOffice.data.type':req.body.tipo
			},function (err,obj){
					res.json(obj);
			});
	}

	function editTienda(req,res){
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
	}

	function deleteTienda(req,res){
		var id = req.params.id;
		Tienda.findByIdAndRemove(id, function (err){
				res.json('se elimino el doc');
		});

	}

};
