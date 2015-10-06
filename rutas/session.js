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
            'usuario': user.usuario,
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

    // Vaida que exista la sesion, si no arroja un error en req.session.err
    this.tokenMiddleware = function(req, res, next) {

        req.session = {};
        //var id_session = req.cookies.session;
        var idSession = req.headers.authorization;

        if (!idSession) {
            req.session.msg = "Session not set";
            req.session.login = false;
            return next();
        }

        //var query = 'SELECT * FROM Sesion_temp WHERE id_session = ?';
        var query = {idSession: idSession};
        SessionHandler.findOne(query, function(err, result) {

            if (err){
                req.session.err = err; return next();
            } if (!_.size(result)) {
                // res.clearCookie('session');
                req.session.msg = "Session: " + idSession + " does not exist";
                req.session.login = false;
                return next();
            }

            req.session.user = result;
            return next();

            // userModel.getDatoUser(req.session.user.usuario, function(err, data){
            //     if (err) {req.session.err = err; return next();}
            //     req.session.userData = data;
            //     req.session.login = true;
            //     return next();
            // });

        });
    };
}

module.exports = Session;
