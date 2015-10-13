var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function serviceLevel (app,Token,io){

	app.use(bodyParser.json());

	app.get('/serviceLevel', getServiceLevel);


	function  getServiceLevel (req,res){ // Acomulado del  dia por tienda y pais.

		var params ={};

		if (req.query.posCode){
			params.posCode = req.query.posCode ;
		}
		else {
			params.posCode = null;
		}

		if (req.query.startDate && req.query.endDate){
			var date = {
				'$gte': req.query.startDate,
				'$lte':req.query.endDate
			};
		}
		else {
		var date = {'$gte':new Date(moment(new Date()).format('YYYY-MM-DD'))};

		}

		if (req.query.timeFactor){
			params.timeFactor = req.query.timeFactor;
		}
		else {
			params.timeFactor = 10;
		}

		var query ={
			'token.state.stateCode': 3 ,
			'token.infoToken.logEndToken':date,
			'token.branchOffice.posCode':params.posCode
		};

	Token.find(query,function (err,arr){

		console.log(arr.length);

		Token.aggregate(
			[	
				{ $match: query	},
				{ $project: {
					logCreation:'$token.infoToken.logCreationToken',					 
					logCalled:'$token.infoToken.logCalledToken',
					logAtention:'$token.infoToken.logAtentionToken',
					logEnd:'$token.infoToken.logEndToken',
					totalAtention:{ $divide: [ {$subtract:['$token.infoToken.logEndToken','$token.infoToken.logCreationToken']}, 60000 ] }} 
				},
				{ $match: { 
					'totalAtention':{ $lte: params.timeFactor}
					}
				}				
			],function (err,obj){
				var sl = (obj.length / arr.length)*100;
				res.json(sl);
				}
			);
		});
	};

	

};

