var bodyParser = require('body-parser');
var _ = require("underscore");

module.exports = function users (app,User,io,mongoose){

	app.use(bodyParser.json());

	var login = new Login(User);

	app.get('/users',findUsers);
	app.post('/users',newUser);
	app.put('/users/:id',editUser);
	app.delete('/users/:id',deleteUser);

	//---------- Manejo de sesiones --------------------------
	app.post('/user/login.json', login.login);
	//app.get('/user/login.json', login.getlogin);

	// app.post(version + '/usuario/logout.json', usuario.logout);
	//
	// app.get(version + '/usuario/checkuser', estudiante.checkUser);
	// app.get(version + '/usuario/checkemail', estudiante.checkEmail);
	// app.get(version + '/usuario/checkidestudiante', estudiante.checkidEstudiante);
	//---------- Fin manejo de sesiones ----------------------

	function findUsers(req,res){
		var query = {};
		if (req.query.id) {query._id = req.query.id;}

		User.find(query, function (err,array){
			res.json(array);
		});
	}

	function newUser(req,res){
		console.log(req.body);
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
		var self = this;

		this.login = function (req, res) {
			console.log(req.body);
			self.validateLogin(req.body, function(err, data) {
				if (err){return res.status(401).json(err);}
				res.json(data);
			});
		};

		this.validateLogin = function (userData, callback) {
			var query = {'email' : userData.name};

			User.findOne(query, function(err, result) {
				var WTF = _.clone(result);
				console.log(_.size(WTF));
				console.log(_.size(result));
				console.log(WTF.password);
				//if (err) return callback(err, null);
				console.log(result);

				return callback(null, result);
				// if (!_.size(result)) {
				// 	var errorNousername = new Error("username: " + userData.name + " no existe");
				// 	errorNousername.nousername = true;
				// 	return callback(errorNousername, null);
				// }
				// if (userData.password === result.password) {
				// //if (bcrypt.compareSync(userData.password, result.password)) {
				// 	callback(null, result);
				// }else{
				// 	var invalidPasswordRrror = new Error("Invalid password");
				// 	invalidPasswordRrror.invalid_password = true;
				// 	callback(invalidPasswordRrror, null);
				// }
			});
		};
	}
};
