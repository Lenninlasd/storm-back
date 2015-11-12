var bodyParser = require('body-parser');
var moment = require('moment');


module.exports = function ASA (app,Token,io){

app.use(bodyParser.json());
app.get('/avgWatingTime',avgWatingTime);
app.get('/asaByDay',asaByDay);

function avgWatingTime (req,res){

		var query = {
			'token.state.stateCode': 3 
		};

		if (req.query.posCode) query['token.branchOffice.posCode']= req.query.posCode ;

		if (req.query.startDate && req.query.endDate){
			query['token.infoToken.logEndToken'] = {
				'$gte': req.query.startDate,
				'$lte':req.query.endDate
			};
		}
		else {
			query['token.infoToken.logEndToken']= {'$lte':new Date(moment(new Date()).format())};
		}

		Token.aggregate(
			[
				{ $match:query },
				{ $project:{
					state:'$token.state.stateCode',
					totalWating:{ $divide: [ {$subtract:['$token.infoToken.logCalledToken','$token.infoToken.logCreationToken']}, 60000 ] }
					}
				},
				{$group:{
					_id:'$state',
					ASA:{$avg:'$totalWating'}
					}
				}
			],function (err,obj){
				res.json(obj);
			}
		);
	};

	function asaByDay (req,res){

		var query = {
			'token.state.stateCode': 3 
		};

		if (req.query.posCode) query['token.branchOffice.posCode']= req.query.posCode ;


		if (req.query.startDate && req.query.endDate){
			query['token.infoToken.logEndToken'] = {
				'$gte': req.query.startDate,
				'$lte':req.query.endDate
			};
		}
		else {
			query['token.infoToken.logEndToken']= {'$lte':new Date(moment(new Date()).format())};
		}

		Token.aggregate(
			[
				{ $match:query },
				{ $project:{
					logEnd:'$token.infoToken.logEndToken',
					totalWating:{ $divide: [ {$subtract:['$token.infoToken.logCalledToken','$token.infoToken.logCreationToken']}, 60000 ] }
					}
				},
				{ $group:
						{
							_id: {day: { $dayOfMonth: "$logEnd"},mes:{$month:"$logEnd"}},
							asaDay:{$avg:'$totalWating'},
							count: { $sum: 1 }							
						}

					}
			],function (err,sample){
				res.json(sample);
			}
		);


	};





};