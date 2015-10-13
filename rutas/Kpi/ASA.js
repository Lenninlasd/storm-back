var bodyParser = require('body-parser');
var moment = require('moment');


module.exports = function ASA (app,Token,io){

app.use(bodyParser.json());
app.get('/avgWatingTime',avgWatingTime);

function avgWatingTime (req,res){

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
					logCreation:'$token.infoToken.logCreationToken',
					logCalled:'$token.infoToken.logCalledToken',
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

};