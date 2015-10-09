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
    indicators = require('./indicators'),
    circles = require('./circles');

module.exports = function(app, io, mongoose) {
    app.use(tokenMiddleware);

    tokens(app,Token,io,mongoose);
    services(app,Service,io,mongoose);
    tiendas(app,Tienda,io,mongoose);
    users(app,User,io,mongoose);
    activities(app,Activity,io,mongoose);
    circles(app,Circle,io,mongoose);
    indicators(app,Token,io,mongoose);
};

// Vaida que exista la sesion, si no arroja un error en req.session.err
tokenMiddleware = function(req, res, next) {
    req.session = {info: {}, login: false, userData: {}	};
    //var id_session = req.cookies.session;
    var idSession = req.headers.authorization;

    if (!idSession) return next();

    SessionHandler.findOne({idSession: idSession}, function(err, result) {
        req.session.err = err;
        if (err || !_.size(result)) return next();

        req.session.info = result;
        User.findOne({email: req.session.info.userEmail}, function(err, data){
            if (err) {req.session.err = err; return next();}
            var userData = data.toObject();
            delete userData.password;
            req.session.userData = userData;
            req.session.login = true;
            return next();
        });
    });
};
