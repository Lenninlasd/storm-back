var bodyParser = require('body-parser');
var moment = require('moment');
var getQuery = require('./queryKpi');


module.exports = function AHT (app,Token,io){

app.use(bodyParser.json());
app.get('/avgAtentionTime',avgAtentionTime);
app.get('/ahtByDay',ahtByDay);


function avgAtentionTime (req,res){

	var query = getQuery(req);

		Token.aggregate(
			[
				{ $match:query },
				{ $project:{
					totalAtention:{ $divide: [ {$subtract:['$token.infoToken.logEndToken','$token.infoToken.logAtentionToken']}, 60000 ] }
					}
				},
				{$group:{
					_id:0,
					AHT:{$avg:'$totalAtention'}
					}
				}
			],function (err,sample){
				res.json(sample);
			}
		);
	};



	function ahtByDay (req,res){

		var query = getQuery(req);	

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
							_id: {day: { $dateToString: { format: '%Y-%m-%d', date: '$logEnd' } }},
							ahtDay:{$avg:'$totalAtention'},
							count: { $sum: 1 }

						}

				},
				{$sort:{ '_id.day':1}}	
			],function (err,sample){
				res.json(sample);
			}
		);


	};


};
