var bodyParser = require('body-parser');
var moment = require('moment');


module.exports = function AHT (app,Token,io){

app.use(bodyParser.json());
app.get('/avgAtentionTime',avgAtentionTime);

function avgAtentionTime (req,res){

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

			var query = {
				'token.state.stateCode': 3 ,
				'token.infoToken.logEndToken':date,
				'token.branchOffice.posCode':params.posCode
			};

		Token.aggregate(
			[
				{ $match:query },
				{ $project:{
					state:'$token.state.stateCode',
					logAtention:'$token.infoToken.logAtentionToken',
					logEnd:'$token.infoToken.logEndToken',
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

};
