var bodyParser = require('body-parser');

module.exports = function rutas (app,Turno,Asesor,Tienda,Service,io,mongoose){

	app.use(bodyParser.json());

	var turnosAll = function (req,res){
		Turno.find(function (err,array){
			res.json(array);
		});
	};
	var turnoById = function (req,res){// get para meter mas info en el turno
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
			'turno.client.lineNumber':req.body.lineNumber,
			'turno.client.screenName':req.body.screenName,
			'turno.motivoVisita':req.body.motivoVisita,
			'turno.emitterAdviser.adviserName':req.body.adviserName,
			'turno.emitterAdviser.adviserLastName':req.body.adviserLastName,
			'turno.emitterAdviser.adviserId':req.body.adviserId,
			'turno.infoTurno.logCreacionTurno':new Date()
		},
		function (err, obj){
			res.json(obj);
			io.emit('NewTurno');	 		
		});
	};
	var takeTurno = function (req,res){// put para Tomar el turno y meter info de asesor
		var id = req.params.id;
		console.log(req.body);
		Turno.findByIdAndUpdate(id,{
			'turno.state':'En Atencion',
			'turno.receiverAdviser.adviserName':req.body.adviserName,
			'turno.receiverAdviser.adviserLastName':req.body.adviserLastName,
			'turno.receiverAdviser.adviserId':req.body.adviserId,
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
	var servicesAll = function(req,res){
		Service.find(function (err,array){
			res.json(array);
		});
	};

	var pruebas = function(req,res){
		var num = req.query.num;
		Turno.find({'turno.idTurno.numerador':num},function (err,array){
			res.json(array[array.length -1]);
		});

	};

	app.get('/turnos',turnosAll);

	app.post('/turnos',newTurno);

	app.get('/turnos/:id',turnoById);
	
	app.put('/takeTurnos/:id',takeTurno);
	
	app.put('/cerrarTurno/:id',cerrarTurno);

	app.get('/services',servicesAll);

	app.get('/pruebas',pruebas);

}




	




 


