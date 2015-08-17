var bodyParser = require('body-parser');

module.exports = function rutas (app,Turno,Asesor,Tienda,Subservicio,io,mongoose){

	app.use(bodyParser.json());

	app.get('/Turnos',function (req,res){
		Turno.find(function (err,array){
			res.json(array);
		});
	});

	app.post('/Turnos', function (req,res) {// Post para crear un nuevo turno
		var info = {};
		Turno.create({
			'turno.idTurno.numerador':'AB',
			'turno.idTurno.consecutivo':req.body.consecutivo,
			'turno.state.description':'Pendiente por Atencion',
			'turno.client.lineNumber':req.body.numero_linea_tigo,
			'turno.client.screenName':req.body.nombre_pantalla,
			'turno.motivoVisita':req.body.servObj.nombre,
			'turno.infoTurno.logCreacionTurno':new Date()

		},function (err, obj){
			res.json(obj);
			io.emit('NewTurno');	 		
		});


	});

	// app.get('/Turnos/:id',function (req,res){// get para meter mas info en el turno
	// 	var id = req.params.id;
	// 	Turno.findById(id,function (err, results){
	// 		if (err)
	// 			res.send(err);
	// 		res.json(results);
	// 	});
	// });
	
	app.put('/takeTurnos/:id',function (req,res){// put para Tomar el turno y meter info de asesor
		var id = req.params.id;
		//console.log(req.body.circleList.branchOffices[0].nombreSucursal);
		Turno.findByIdAndUpdate(id,{
			'turno.state':'En Atencion',
			'turno.asesor.asesorName':req.body.name,
			'turno.asesor.lastName':req.body.lastName,
			'turno.asesor.asesorId':req.body.idUser,
			'turno.branchOffice.branchOfficesName':req.body.circleList.branchOffices[0].nombreSucursal,
			'turno.branchOffice.posCode':req.body.circleList.branchOffices[0].codigoPos,
			'turno.branchOffice.city':req.body.circleList.branchOffices[0].ciudad,
			'turno.branchOffice.region':req.body.circleList.branchOffices[0].regional,
			'turno.infoTurno.logAtencion':new Date()

		},
		{new:true},
		function (err,results){
			res.json(results);
			//console.log(results);
		});
	});

	
	app.put('/cerrarTurno/:id',function (req,res){// put para cerrar el turno
		var id = req.params.id;
		console.log('este es el que interesa:',req.body.turno.infoTurno);
		Turno.findByIdAndUpdate(id,{
			'turno.infoTurno.area':req.body.turno.infoTurno.area,
			'turno.infoTurno.categoriaCliente':req.body.turno.infoTurno.categoria_cliente,
			'turno.infoTurno.services':req.body.turno.infoTurno.services,
			//'turno.infoTurno.services.[0]serviceId':req.body.turno.infoTurno.services.sid,
			'turno.state':'Atendido'
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

	app.get('/Subservicios',function (req,res){
		Subservicio.find(function (err,array){
			res.json(array);
		});
	});

	app.get('/prueba',function (req,res){
		// Subservicio.find({'subservicio.serv_id':'S04','subservicio.categoria':'Otros'},function (err,array){
		// 	res.json(array);
		// });
		Turno.aggregate([
			{$match:{'turno.estado':'Atendido'}},
			{$group:{_id:'$_id',area:{$sum:'$turno.atencion_a_turno.infoTurno.area'}}}]
			,function (err,b){
				if (err){
					console.log(err);
				}
			res.json(b);
		});

	});

	

	

	

}




	




 


