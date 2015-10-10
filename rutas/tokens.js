var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function tokens (app,Token,io,mongoose){

	app.use(bodyParser.json());

			app.get('/tokens',tokenByIdAndCollection);
			app.post('/tokens',newToken);
			app.put('/callToken', callToken);
			app.put('/takeToken',takeToken);
			app.put('/closeToken',closeToken);
			app.put('/abandoningToken',abandoningToken);

			io.on('connection', function(socket){
					socket.on('insertService', function (data) {
							insertService(data, function (result) {io.emit('resultService', result);});
					});
					socket.on('updateSubservice', function (data) {
							updateSubservice(data, function (result) {
								io.emit('resultService', result);
							});
					});
			});


			function tokenByIdAndCollection(req,res){// get para meter mas info en el turno
					var query = {};
					if (req.query.id) {query._id = req.query.id;}
					if (req.query.state) {query['token.state.stateCode'] = req.query.state;}

					Token.find(query, function (err, results){
						if (err)
							res.send(err);
							res.json(results);
					});
			}

			function newToken(req,res) {// Post para crear un nuevo turno

				var numerator = req.body.numerator;
				var curDate = new Date(moment(new Date()).format('YYYY-MM-DD'));
				// 'token.branchOffice.posCode':filtro.posCode,
				Token.find({
					  'token.idToken.numerator': numerator,
					  'token.infoToken.logCreationToken':{'$gte':curDate}
					},
					{'token.idToken':1})
					.sort({'token.infoToken.logCreationToken': -1})
					.limit(1)
					.exec(function (err,data){
						var consecutive = data.length === 0 ? 1 : data[0].token.idToken.consecutive + 1;

						// Token Creation
						Token.create({
							'token.idToken.numerator':req.body.numerator,
							'token.idToken.consecutive':consecutive,
							'token.state.description':'pending',
							'token.state.stateCode': 0,
							'token.client.lineNumber':req.body.lineNumber,
							'token.client.screenName':req.body.screenName,
							//'token.motivoVisita':req.body.motivoVisita,
							'token.emitterAdviser.adviserName':req.body.adviserName,
							'token.emitterAdviser.adviserLastName':req.body.adviserLastName,
							'token.emitterAdviser.adviserId':req.body.adviserId,
							'token.emitterAdviser.adviserEmail':req.body.adviserEmail,
							'token.motivoVisita': {serviceName: req.body.service.serviceName, serviceId: req.body.service.serviceId},
							'token.infoToken.logCreationToken': new Date()
						},
						function (err, obj){
							if (err) {
								console.log(err);
							}else {
								res.json(obj);
								io.emit('newToken', obj);
							}
						});
					});
			}

			function takeToken (req,res){// put para Tomar el turno y meter info de asesor
				var id = req.query.id;
				//console.log(req.body);
				Token.findByIdAndUpdate(id,{
					'token.state.description':'in attention',
					'token.state.stateCode': 2,
					'token.receiverAdviser.adviserName':req.body.adviserName,
					'token.receiverAdviser.adviserLastName':req.body.adviserLastName,
					'token.receiverAdviser.adviserId':req.body.adviserId,
					'token.receiverAdviser.adviserEmail':req.body.adviserEmail,
					// 'token.branchOffice.branchOfficesName':req.body.circleList.branchOffices[0].nombreSucursal,
					// 'token.branchOffice.posCode':req.body.circleList.branchOffices[0].codigoPos,
					// 'token.branchOffice.city':req.body.circleList.branchOffices[0].ciudad,
					// 'token.branchOffice.region':req.body.circleList.branchOffices[0].regional,
					'token.infoToken.logAtentionToken':new Date()

				},
				{new:true},function (err,results){
						res.json(results);
						io.emit('takeToken');
				});
			}

			function callToken(req, res) {
				var id = req.body.id;
				Token.findByIdAndUpdate(id, {
					'token.infoToken.logCalledToken':new Date()
				},
				{new:true}, function (err, results) {
					res.json(results);
				});
			}

			function insertService(data, callback){
					//console.log(data);
					var id = data.id;
					Token.findByIdAndUpdate(id,{
						$push: {'token.infoToken.services': data.service}
					}, {new: true}, function(err, result){
							return callback(result);
					});
			}

			function updateSubservice(data, callback) {
					Token.findOneAndUpdate({'token.infoToken.services._id': data.idService},
					{'$set': {
						'token.infoToken.services.$.subServices': data.subServices
					}},{new:true}, function(err, result) {
							return callback(result);
					});
			}

			// put para cerrar el turno
			function closeToken (req,res){
					var id = req.body.id;
					Token.findByIdAndUpdate(id,{
						// 'token.infoToken.area':req.body.turno.infoTurno.area,
						// 'token.infoToken.clientCategorie':req.body.turno.infoTurno.categoria_cliente,
						// 'token.infoToken.services':req.body.turno.infoTurno.services,
						'token.state.description':'closed',
						'token.state.stateCode': 3,
						'token.infoToken.logEndToken':new Date()
					},
					{new:true},function (err,results){
						res.json(results);
					});
			}

			function abandoningToken(req, res) {
					var id = req.body.id;
					Token.findByIdAndUpdate(id,{
						'token.state.description':'abandoned',
						'token.state.stateCode': 4,
						'token.infoToken.logEndToken':new Date()
					},
					{new:true},function (err,results){
						res.json(results);
					});
			}

};
