var crypto = require('crypto'),
    SessionHandler = require('../models/app_DB_Schemas_Sessions');

function Session () {
    'use strict';

    this.startSession = function(req, user, callback) {
        // Generate session id
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var idSession = crypto.createHash('sha1').update(current_date + random).digest('hex');

        // Insert session document
        SessionHandler.create({
            'idSession':idSession,
            'ipAddress':req.ip,
            'userEmail': user.email,
            'userAgent': req.headers['user-agent'],
            'creationDate': new Date()
        },function (err, obj){
            if (err) return callback(err, null);
            // console.log(obj);
            callback(null, obj.idSession);
        });
    };

    this.endSession = function(idSession, callback) {
        // Remove session document
        var query = {idSession: idSession};
        SessionHandler.remove(query, function(err, result) {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    };
}

module.exports = Session;
