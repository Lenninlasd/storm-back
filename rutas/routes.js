var _ = require("underscore");
    // Cargo los Schemnas de las DB
var Token = require('../models/app_DB_Schemas_Tokens'),
    User = require('../models/app_DB_Schemas_Users'),
    Tienda = require('../models/app_DB_Schemas_BranchOffices'),
    Service = require('../models/app_DB_Schemas_Services'),
    Activity = require('../models/app_DB_Schemas_Activities'),
    Circle = require('../models/app_DB_Schemas_Circles'),
    SessionHandler = require('../models/app_DB_Schemas_Sessions'),

    // Cargo las rutas de la API
    routes = require('./routes'),
    tokens = require('./tokens'),
    services = require('./services'),
    tiendas = require('./tiendas'),
    users = require('./users'),
    activities = require('./activities'),
    serviceLevel = require('./Kpi/serviceLevel'),
    aht = require('./Kpi/AHT'),
    asa = require('./Kpi/ASA'),
    circles = require('./circles');

module.exports = function(app, io, mongoose) {
    app.use(tokenMiddleware);

    io.on('connection', function(socket){
        var channel;
        socket.on('session', function (session) {
            validateSession(session.idSession, function (session) {
                channel = session.userData.circleList.branchOffices[0].posCode;
                socket.request.canal = channel;
                socket.join(channel);
            });
        });
    });

    tokens(app,Token,io,mongoose);
    services(app,Service,io,mongoose);
    tiendas(app,Tienda,io,mongoose);
    users(app,User,io,mongoose);
    activities(app,Activity,io,mongoose);
    circles(app,Circle,io,mongoose);
    serviceLevel(app,Token,io,mongoose);
    aht(app,Token,io);
    asa(app,Token,io);
};

// Vaida que exista la sesion, si no arroja un error en req.session.err
var tokenMiddleware = function(req, res, next) {
    req.session = {};
    //var id_session = req.cookies.session;
    var idSession = req.headers.authorization;

    validateSession(idSession, function (session) {
        req.session = session;
        return next();
    });
};

function validateSession(idSession, callback) {
    var session = {info: {}, login: false, userData: {}	};
    SessionHandler.findOne({idSession: idSession}, function(err, result) {
        session.err = err;
        if (err || !_.size(result)) return callback(session);

        session.info = result;
        User.findOne({email: session.info.userEmail}, function(err, data){
            if (err) {session.err = err; return callback(session);}
            var userData = data.toObject();
            delete userData.password;
            session.userData = userData;
            session.login = true;
            return callback(session);
        });
    });
}
