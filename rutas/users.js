var bodyParser = require('body-parser');
var _ = require("underscore");
var SessionRoute = require('./session');
// var SessionHandler = require('../models/app_DB_Schemas_Sessions');
// var Session = require('./models/app_DB_Schemas_Session');

module.exports = function users (app,User,io,mongoose){

	app.use(bodyParser.json());

	var login = new Login(User);

	app.get('/users',findUsers);
	app.post('/users',newUser);
	app.put('/users/:id',editUser);
	app.delete('/users/:id',deleteUser);

	//---------- Manejo de sesiones --------------------------
	app.get('/user/login.json', login.getlogin);
	app.post('/user/login.json', login.login);
	app.post('/user/logout.json', login.logout);
	//---------- Fin manejo de sesiones ----------------------

	function findUsers(req,res){
		var query = {};
		if (req.query.id) {query._id = req.query.id;}

		User.find(query, function (err,array){
			res.json(array);
		});
	}

	function newUser(req,res){
		User.create({
			'user.userName':req.body.user,
			'user.email':req.body.email,
			'user.password':req.body.password,
			'user.name':req.body.name,
			'user.lastName':req.body.lastName,
			'user.idUser':req.body.idUser,
			'user.idType':req.body.idType,
			'user.userType':req.body.role,
			'user.creationDate': new Date()
		},function (err,obj){
			res.json(obj);
		});
	}

	function editUser(req,res){
		var id = req.params.id;
		User.findByIdAndUpdate(id,{
			'user.userName':req.body.userName,
			'user.password':req.body.password,
			'user.name':req.body.name,
			'user.lastName':req.body.lastName,
			'user.idUser':req.body.idUser,
			'user.idType':req.body.idType,
			'user.role':req.body.role,
			'user.creationDate': new Date()
		},
		{new:true},function (err,obj){
			res.json(obj);
		});
	}

	function deleteUser(req,res){
		var id = req.params.id;
		User.findByIdAndRemove(id, function (err){
			res.json('se elimino el doc');
		});
	}

	function Login(User){
			'use strict';
			var session = new SessionRoute();
			var self = this;

			this.login = function (req, res) {
					self.validateLogin(req.body, function(err, user) {
							if (err) return res.status(401).json(err);

							// Genera una id_session sha1 e inserta en bd los datos de sesion
							session.startSession(req, user, function(err, idSession){
								if (err) return res.status(500).json(err);
								return res.json({idSession: idSession, user: user, login: true});
							});
					});
			};

			this.validateLogin = function (userData, callback) {
				var query = {'email' : userData.name};

				User.findOne(query, function(err, result) {
						if (err) return callback(err, null);

						if (!_.size(result)) {
								var errorNousername = new Error("username: " + userData.name + " no existe");
								errorNousername.nousername = true;
								return callback(errorNousername, null);
						}
						if (userData.password === result.password) {
								//if (bcrypt.compareSync(userData.password, result.password))
								var resultCopy = result.toObject();
								delete resultCopy.password;
								return callback(null, resultCopy);
						}else{
								var invalidPasswordRrror = new Error("Invalid password");
								invalidPasswordRrror.invalidPassword = true;
								return callback(invalidPasswordRrror, null);
						}
				});
			};

			this.getlogin = function(req, res) {
					if (req.session.err) return res.status(500).json(req.session);
					res.json(req.session);
			};

			this.logout = function(req, res, next){
					var idSession = req.headers.authorization;
					if (!idSession) return res.json({login: false, msg: 'Session not set'});

					session.endSession(idSession, function (err) {
							return res.json({login: false, msg: 'Session has been closed'});
					});
			};
	}

};
