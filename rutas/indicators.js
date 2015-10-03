var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function indicators (app,Token,io){

	app.use(bodyParser.json());

	app.get('/serviceLevel', getServiceLevel);

	function  getServiceLevel (req,res){

		var curDate = new Date(moment(new Date()).format('YYYY-MM-DD'));

		Token.aggregate(
			[
				{ $match: { 
					'token.state.stateCode': 3 ,
					'token.infoToken.logEndToken':{'$gte':curDate},
					'token.branchOffice.posCode':null 
					}
				},
				{ $project: {
					 logCreation:'$token.infoToken.logCreationToken',					 
					 logCalled:'$token.infoToken.logCalledToken',
					 logAtention:'$token.infoToken.logAtentionToken',
					 logEnd:'$token.infoToken.logEndToken',
					 totalAtention:{ $divide: [ {$subtract:['$token.infoToken.logEndToken','$token.infoToken.logCreationToken']}, 6000 ] }
					} 
				},
				{ $match: { 
					'totalAtention':{ $lte: 10}
					}
				},
				// { $group: { _id:{numertor:"$token.idToken.numerator"} , total: { $sum:1 } } }
				// { $sort: { total: -1 } }
				],
				function (err,obj){
					res.json(obj);
				});
		
	};
	
};

