var bodyParser = require('body-parser');

module.exports = function rutas (app,Turno,Asesor,Tienda,Subservicio,io,mongoose){

	app.use(bodyParser.json());

	var turnosAll = function (req,res){
		Turno.find(function (err,array){
			res.json(array);
		});
	};
	var turnoPorId = function (req,res){// get para meter mas info en el turno
		var id = req.params.id;
		Turno.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	};
	var newTurno = function (req,res) {// Post para crear un nuevo turno
		Turno.create({	
			'turno.idTurno.numerador':'AB',
			'turno.idTurno.consecutivo':req.body.consecutivo,
			'turno.state.description':'Pendiente por Atencion',
			'turno.client.lineNumber':req.body.numero_linea_tigo,
			'turno.client.screenName':req.body.nombre_pantalla,
			'turno.motivoVisita':req.body.servObj.serviceName,
			'turno.infoTurno.logCreacionTurno':new Date()
		},
		function (err, obj){
			res.json(obj);
			io.emit('NewTurno');	 		
		});
	};
	var takeTurno = function (req,res){// put para Tomar el turno y meter info de asesor
		var id = req.params.id;		
		Turno.findByIdAndUpdate(id,{
			'turno.state':'En Atencion',
			'turno.asesor.asesorName':req.body.name,
			'turno.asesor.asesorLastName':req.body.lastName,
			'turno.asesor.asesorId':req.body.idUser,
			'turno.branchOffice.branchOfficesName':req.body.circleList.branchOffices[0].nombreSucursal,
			'turno.branchOffice.posCode':req.body.circleList.branchOffices[0].codigoPos,
			'turno.branchOffice.city':req.body.circleList.branchOffices[0].ciudad,
			'turno.branchOffice.region':req.body.circleList.branchOffices[0].regional,
			'turno.infoTurno.logAtencion':new Date()

		},
		{new:true},function (err,results){
			res.json(results);
		});
	};
	var cerrarTurno  = function (req,res){// put para cerrar el turno
		var id = req.params.id;
		// console.log(req.body);
		// console.log('este es el que interesa:',req.body.turno.infoTurno);
		Turno.findByIdAndUpdate(id,{
			'turno.infoTurno.area':req.body.turno.infoTurno.area,
			'turno.infoTurno.categoriaCliente':req.body.turno.infoTurno.categoria_cliente,
			'turno.state':'Atendido',
			'turno.infoTurno.services':req.body.turno.infoTurno.services,
			'turno.infoTurno.logFin':new Date()
		},
		{new:true},
		function (err,results){
			res.json(results);
		});

	};	

	app.get('/Turnos',turnosAll);

	app.post('/Turnos',newTurno);

	app.get('/Turnos/:id',turnoPorId);
	
	app.put('/takeTurnos/:id',takeTurno);
	
	app.put('/cerrarTurno/:id',cerrarTurno);

	app.get('/Tiendas', function (req,res){
		Tienda.find(function (err,array){
			res.json(array);
		});
	});

}




	




 


