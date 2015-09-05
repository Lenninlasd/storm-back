var bodyParser = require('body-parser');

module.exports = function users (app,User,io,mongoose){

	app.use(bodyParser.json());

	var usersAll = function(req,res){
		User.find(function (err,array){
			res.json(array);
		});
	};

	var userById = function(req,res){
		var id = req.params.id;
		User.findById(id,function (err, results){
			if (err)
				res.send(err);
			res.json(results);
		});
	};

	var newUser = function(req,res){
		console.log(req.body);
		User.create({
			'user.userName':req.body.userName,
			'user.password':req.body.password,
			'user.name':req.body.name,
			'user.lastName':req.body.lastName,
			'user.idUser':req.body.idUser,
			'user.idType':req.body.idType,
			'user.role':req.body.role,
			'user.creationDate': new Date()
		},function (err,obj){
			res.json(obj);
		});

	};

	var editUser = function(req,res){
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

	};

	var deleteUser = function(req,res){
		var id = req.params.id;
		User.findByIdAndRemove(id, function (err){
			res.json('se elimino el doc');
		});

	};

	app.get('/users',usersAll);
	app.get('/users/:id',userById);
	app.post('/users',newUser);
	app.put('/users/:id',editUser);
	app.delete('/users/:id',deleteUser);


};