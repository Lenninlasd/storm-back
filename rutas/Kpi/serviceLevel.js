var bodyParser = require('body-parser');
var moment = require('moment');
var getQuery = require('./queryKpi');

module.exports = function serviceLevel (app, Token, io){

	app.use(bodyParser.json());
	/**	Esta ruta devuelve el nivel de servicio de un conjunto de turnos que definan los parametros, los parametros que acepta la ruta son:
  	@posCode: String; es el parametro que filtra por una tienda especifia
  	@startDate: Date and @endDate: Date ; Rango de fechas para filtrar los turnos ('YYYY-MM-DD')
  	@timeFactor: El factor de tiempo con el que se mide el nivel de servicio, se mide en minutos. **/
	app.get('/serviceLevel', getServiceLevel);

	// Obtiene el nivel de servicio por cada dia, por sucursal, entre un rango de fechas con un factor de tiempo
	//@posCode: String; es el parametro que filtra por una tienda especifia
	//@startDate: Date and @endDate: Date ; Rango de fechas para filtrar los turnos ('YYYY-MM-DD')
	app.get('/slByDay', slByDay);
	//Obtiene el nivel de servicio Hora a Hora para un dia determinado , por tienda.
	app.get('/slByHour', getServiceLevelByHour);


	function  getServiceLevel (req,res){ // Acomulado del  dia por tienda y pais.

		var query = getQuery(req);
		var params = {};
		params.timeFactor = req.query.timeFactor || 10;

		Token.find(query,function (err,arr){

			Token.aggregate(
				[
					{ $match: query	},
					{ $project: 
						{// tiempo total de llamado en minutos						
							totalAtention:{ $divide: [ {$subtract:['$token.infoToken.logCalledToken','$token.infoToken.logCreationToken']}, 60000 ] }
						}
					},
					{ $match: { // todos los turnos que tienen un tiempo de llamado menor al factor de tiempo
						'totalAtention':{ $lte: params.timeFactor}
						}
					}
				],function (err,sample){
					var sl = (sample.length / arr.length)*100;
					res.json(sl);
				}
			);
		});
	}

	function slByDay (req,res){

		var query = getQuery(req);
		var params = {};
		params.timeFactor = req.query.timeFactor || 10;

			Token.aggregate(
				[
					{ $match: query	},
					{ $project:
						{// tiempo total de llamado en minutos
							logEnd:'$token.infoToken.logEndToken',
							watingTime:{ $divide: [ {$subtract:['$token.infoToken.logCalledToken','$token.infoToken.logCreationToken']}, 60000 ] }
						}
					},
					{ $project:
						{
							watingTime:'$watingTime',
							logEnd:'$logEnd',
							puntual:{ // si el turno es puntual se asigna 1 si no es puntual 0
										$cond:{if:{$lte:['$watingTime',params.timeFactor]},then:1,else:0}
									}
						}
					},
					{ $group:
						{// se saca la fecha 'yyyy-mm-dd' y el tota de puntuales por dia
							_id: {day: { $dateToString: { format: '%Y-%m-%d', date: '$logEnd' } }},
							avgWatingTime:{ $avg:'$watingTime'},
							totalPuntualDay:{ $sum:'$puntual'},
							totalTokensDay: { $sum: 1 }							
						}
					},
					{$project:
						{// nivel de servicio por dia
							avgWatingTime:'$avgwatingTime',
							totalPuntualDay:'$totalPuntualDay',
							totalTokensDay:'$totalTokensDay',
							serviceLevelDay:{$multiply:[{$divide:['$totalPuntualDay','$totalTokensDay']},100]}
						}
					},
					{$sort:{ '_id.day':1}}
				],function (err,sample){
					res.json(sample);
					}
			);

	}

	function getServiceLevelByHour (req,res) {

		var params = {};
		var query = {'token.state.stateCode': { $in : [3, 4]}};

		if (req.query.posCode) query['token.branchOffice.posCode']= req.query.posCode ;

		if (req.query.currentDay){
			query['token.infoToken.logEndToken'] = {				
				'$gte': new Date(moment(new Date(req.query.currentDay)).format('YYYY-MM-DD')),
				'$lte': new Date(moment(new Date(req.query.currentDay)).add(1, 'd').format('YYYY-MM-DD')) // next day
			};
		}else {
			query['token.infoToken.logEndToken']= {
				'$gte':new Date(moment(new Date()).format('YYYY-MM-DD')),
				'$lte':new Date(moment(new Date()).format())
			};
		}

		params.timeFactor = req.query.timeFactor ? req.query.timeFactor : 10;
		console.log(query);
			Token.aggregate(
				[
					{ $match: query	},
					{ $project: 
						{
							logEnd:'$token.infoToken.logEndToken',
							watingTime:{ $divide: [ {$subtract:['$token.infoToken.logCalledToken','$token.infoToken.logCreationToken']}, 60000 ] }
						}
					},
					{ $project:
						{
							watingTime:'$watingTime',
							logEnd:'$logEnd',
							puntual:{
										$cond:{if:{$lte:['$watingTime',params.timeFactor]},then:1,else:0}
									}
						}
					},
					{ $group:
						{
							_id: {hora: { $hour: "$logEnd"}},
							avgWatingTime:{$avg:'$watingTime'},
							totalPuntualHour:{$sum:'$puntual'},
							totalTokensHour: { $sum: 1 }
						}
					},
					{$project:
						{// nivel de servicio por dia
							avgWatingTime:'$avgwatingTime',
							totalPuntualHour:'$totalPuntualHour',
							totalTokensHour:'$totalTokensHour',
							serviceLevelHour:{$multiply:[{$divide:['$totalPuntualHour','$totalTokensHour']},100]}
						}
					}
				],function (err,sample){
					res.json(sample);
				}
			);

	}

};
