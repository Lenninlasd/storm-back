var bodyParser = require('body-parser');
var moment = require('moment');


module.exports = function AHT (app,Token,io){

app.use(bodyParser.json());
app.get('/avgAtentionTime',avgAtentionTime);
app.get('/ahtByDay',ahtByDay);


function avgAtentionTime (req,res){

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
					totalAtention:{ $divide: [ {$subtract:['$token.infoToken.logEndToken','$token.infoToken.logAtentionToken']}, 60000 ] }
					}
				},
				{$group:{
					_id:'$state',
					AHT:{$avg:'$totalAtention'}
					}
				}
			],function (err,obj){
				res.json(obj);
			}
		);
	};



	function ahtByDay (req,res){

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
					totalAtention:{ $divide: [ {$subtract:['$token.infoToken.logEndToken','$token.infoToken.logAtentionToken']}, 60000 ] }
					}
				},
				{ $group:
						{
							_id: {day: { $dayOfMonth: "$logEnd"},mes:{$month:"$logEnd"}},
							ahtDay:{$avg:'$totalAtention'},
							count: { $sum: 1 }							
						}

					}
			],function (err,sample){
				res.json(sample);
			}
		);


	};


};
