var bodyParser = require('body-parser');
var moment = require('moment');
var getQuery = require('./queryKpi');

module.exports = function ASA (app,Token,io){

app.use(bodyParser.json());
app.get('/avgWatingTime',avgWatingTime);
app.get('/asaByDay',asaByDay);

	function avgWatingTime (req,res){

		var query = getQuery(req);

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
	}

	function asaByDay (req,res){

		var query = getQuery(req);

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
	}





};
