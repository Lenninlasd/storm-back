var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function indicators (app,Token,io){

	app.use(bodyParser.json());

	app.get('/serviceLevel', getServiceLevel);

	function  getServiceLevel (req,res){

		Token.aggregate(
			[
				{ $match: { 'token.state.stateCode': 3 } },
				{ $group: { _id:{numertor:"$token.idToken.numerator"} , total: { $sum:1 } } }
				// { $sort: { total: -1 } }
			],
			function (err,obj){
				res.json(obj);
		});
		
	};
	
};

