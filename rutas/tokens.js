var bodyParser = require('body-parser');

module.exports = function turnos (app,Token,io,mongoose){

	app.use(bodyParser.json());

	var turnoByIdAndCollection = function (req,res){// get para meter mas info en el turno
		var query = {};

		if (req.query.id) {query._id = req.query.id;}
		if (req.query.state) {query['token.state.stateCode'] = req.query.state;}

		Token.find(query, function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});

	};
	var newTurno = function (req,res) {// Post para crear un nuevo turno

		var filtro = req.query;
		console.log(filtro);
		var fecha = new Date();
		var ano = fecha.getFullYear();
		var	mes = fecha.getMonth()+1;
		var dia = fecha.getDate();
		var lapso = dia+1;
		var start = ano+'-'+mes+'-'+dia;
		var end = ano+'-'+mes+'-'+lapso;

		

		Token.find({
			'token.idToken.numerator':filtro.num,
			// 'token.branchOffice.posCode':filtro.posCode,
			'token.infoToken.logCreationToken':{'$gte':start,'$lte':end}
		},
		function (err,array){
			if (array){
				 console.log(parseInt(array[array.length -1].token.idToken.consecutive)+1);
	
			}
			else {
				console.log('por ahora funciona')
			}
		});


		Token.create({
			'token.idToken.numerator':req.body.numerator,
			'token.idToken.consecutive':23,
			'token.state.description':'pending',
			'token.state.stateCode': 0,
			'token.client.lineNumber':req.body.lineNumber,
			'token.client.screenName':req.body.screenName,
			'token.motivoVisita':req.body.motivoVisita,
			'token.emitterAdviser.adviserName':req.body.adviserName,
			'token.emitterAdviser.adviserLastName':req.body.adviserLastName,
			'token.emitterAdviser.adviserId':req.body.adviserId,
			'token.infoToken.logCreationToken':new Date()
		},
		function (err, obj){
			if (err) {
				console.log(err);
			}else {
				res.json(obj);
				io.emit('newToken');
			}
		});
	};
	var takeTurno = function (req,res){// put para Tomar el turno y meter info de asesor
		var id = req.params.id;
		console.log(req.body);
		Token.findByIdAndUpdate(id,{
			'token.state':'En Atencion',
			'token.receiverAdviser.adviserName':req.body.adviserName,
			'token.receiverAdviser.adviserLastName':req.body.adviserLastName,
			'token.receiverAdviser.adviserId':req.body.adviserId,
			'token.branchOffice.branchOfficesName':req.body.circleList.branchOffices[0].nombreSucursal,
			'token.branchOffice.posCode':req.body.circleList.branchOffices[0].codigoPos,
			'token.branchOffice.city':req.body.circleList.branchOffices[0].ciudad,
			'token.branchOffice.region':req.body.circleList.branchOffices[0].regional,
			'token.infoTurno.logAtentionTurno':new Date()

		},
		{new:true},function (err,results){
			res.json(results);
		});
	};
	var cerrarTurno  = function (req,res){// put para cerrar el turno
		var id = req.params.id;
		// console.log(req.body);
		// console.log('este es el que interesa:',req.body.turno.infoTurno);
		Token.findByIdAndUpdate(id,{
			'token.infoToken.area':req.body.turno.infoTurno.area,
			'token.infoToken.clientCategorie':req.body.turno.infoTurno.categoria_cliente,
			'token.state':'Atendido',
			'token.infoToken.services':req.body.turno.infoTurno.services,
			'token.infoToken.logEndToken':new Date()
		},
		{new:true},function (err,results){
			res.json(results);
		});

	};

	var consecutivo = function(req,res){
		var filtro = req.query;
		var fecha = new Date();
		var ano = fecha.getFullYear();
		var	mes = fecha.getMonth();
		var dia = fecha.getDate()+1;
		var lapso = dia+1;
		var start = new Date(ano,mes,dia);
		var end = new Date(ano,mes,lapso);

		Token.find({
			'token.idToken.numerator':filtro.num,
			'token.branchOffice.posCode':filtro.posCode,
			'token.infoToken.logCreationToken':{$gte :start, $lte :end}
		},
		function (err,array){
			res.json(array);
		});
	};

	app.get('/tokens',turnoByIdAndCollection);
	app.get('/consecutivo',consecutivo);
	app.post('/tokens',newTurno);
	app.put('/takeTurnos/:id',takeTurno);
	app.put('/cerrarTurno/:id',cerrarTurno);
}


