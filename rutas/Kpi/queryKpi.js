var moment = require('moment');

module.exports = function getQuery(req) {
        var query = {'token.state.stateCode': { $in : [3, 4]}};

		if (req.query.posCode) query['token.branchOffice.posCode']= req.query.posCode ;

		if (req.query.startDate && req.query.endDate){
			query['token.infoToken.logEndToken'] = {
				'$gte': req.query.startDate,
				'$lte':req.query.endDate
			};
		}else {
			query['token.infoToken.logEndToken']= {'$lte':new Date(moment(new Date()).format())};
		}
		return query;
	};
