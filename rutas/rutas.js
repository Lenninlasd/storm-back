var bodyParser = require('body-parser');

module.exports = function rutas (app,Turno, Asesor, Tienda, mongoose){

	app.use(bodyParser.json());

	app.get('/Turnos',function (req,res){
		Turno.find(function (err,array){
			res.json(array);
		});
	});

	app.post('/Turnos', function (req,res) {// Post para crear un nuevo turno

	 	Turno.create({
	 		'turno.estado':'Pendiente por Atencion',
	 		'turno.toma_de_turno.numero_linea_tigo':req.body.numero_linea_tigo,
	 		'turno.toma_de_turno.nombre_pantalla':req.body.nombre_pantalla,
	 		'turno.toma_de_turno.motivo_visita':req.body.servObj.nombre,
	 		'turno.atencion_a_turno.infoTurno.servicio':req.body.servObj,
	 		'turno.codigo_turno':req.body.codigo_turno,
	 		'turno.atencion_a_turno.terminal.estado':'libre'
	 	},function (err, obj){
	 		res.json(obj);
	 	});
	});

	app.get('/Turnos/:id',function (req,res){// get para meter mas info en el turno
		var id = req.params.id;
		Turno.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	});

	
	app.put('/Turnos/:id',function (req,res){// put para meter masinfo en el turno
		var id = req.params.id;
		
		Turno.findByIdAndUpdate(id,{
			'turno.atencion_a_turno.terminal.codigo_terminal':req.body.codigo_terminal,
			'turno.atencion_a_turno.terminal.codigo_asesor':req.body.codigo_asesor
		},{new:true},function (err,results){
			res.json(results);
			console.log(results);
		});
	});

	
	app.get('/takeTurnos/:id',function (req,res){// get para Tomar el turno
		var id = req.params.id;
		Turno.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
			// console.log(results);
		});
	});

	app.put('/takeTurnos/:id',function (req,res){// put para Tomar el turno
		var id = req.params.id;
		Turno.findByIdAndUpdate(id,{
			'turno.estado':'En Atencion'		
		},
		{new:true},
		function (err,results){
			res.json(results);
			console.log(results);
		});
	});

	
	app.put('/cerrarTurno/:id',function (req,res){// put para cerrar el turno
		var id = req.params.id;
		Turno.findByIdAndUpdate(id,{
			'turno.atencion_a_turno.infoTurno.tiempo_espera':req.body.infoTurno.tiempo_espera,
			'turno.atencion_a_turno.infoTurno.area':req.body.infoTurno.area,
			'turno.atencion_a_turno.infoTurno.categoria_cliente':req.body.infoTurno.categoria_cliente,
			'turno.atencion_a_turno.infoTurno.servicio':req.body.infoTurno.servicio,
			'turno.atencion_a_turno.infoTurno.sub_servicio':req.body.infoTurno.sub_servicio,
			'turno.estado':'Atendido'
		},
		{new:true},
		function (err,results){
			res.json(results);
		});
	});

	app.get('/Tiendas', function (req,res){
		Tienda.find(function (err,array){
			res.json(array);
		});
	});

	app.post('/Tiendas',function (req,res){
		Tienda.collection.insert(req.body,function (err,array){
			res.json(array);
		});
	});

}




	




 


