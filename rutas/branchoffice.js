var bodyParser = require('body-parser');
var Activity = require('../models/app_DB_Schemas_Activities');
var moment = require('moment');

module.exports = function tiendas (app,Tienda,io,mongoose){

	app.use(bodyParser.json());

	app.get('/branchOffice', branchOffice);
	app.get('/tiendas/:id', tiendaById);
	app.get('/terminal', getTerminal);
	app.get('/avaliableTerminals', avaliableTerminals);
	app.post('/tiendas', newTienda);
	app.put('/tiendas/:id',  editTienda);
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

	// Lista de todas las terminales de un branchOffice
	function getTerminal(req, res) {

			if (!req.query.posCode) return res.status(400).json({err: 'missing posCode'});

			Tienda.aggregate(
			[
					{	$match: {posCode: req.query.posCode}},
					{
						$project: {
							terminals : "$blueCircles.terminals"
						}
					}
			],function (err, terminals) {
					if (err) return res.status(500).json(err);
					return res.json(terminals[0]);
			});
	}

	//Lista de terminales disonibles de un branchOffice
	function avaliableTerminals(req, res) {

		if (!req.query.posCode) return res.status(400).json({err: 'missing posCode'});

		Activity.aggregate([
				{	$match: {	day: new Date(moment(new Date()).format('YYYY-MM-DD'))}},
				{	$unwind: "$activity"},
				{ $match:
					 {
							"activity.activityEndTime" : new Date(0), //ultimo elemento del fila del array
							"activity.branchOffice.posCode" : req.query.posCode, //Puede cambiar de ofi
							"activity.activityEvent.eventCode": {$ne: "10"} // que no esté cerrado
						}
				},
				{
					$project: {
						branchOfficePosCode: "$activity.branchOffice.posCode",
						activityEventevent: "$activity.activityEvent",
						terminal: "$activity.branchOffice.terminal",
						adviser: "$adviser"
					}
				}
		], function (err, avaliableTerminals) {
				if (err) return res.status(500).json(err);
				return res.json(avaliableTerminals);
		});
	}


};
