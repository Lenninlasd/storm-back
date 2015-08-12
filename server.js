
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	mongoose = require('mongoose'),
	db = mongoose.connection,
	// bodyParser = require('body-parser'),
	port = 5000,
	Turno = require('./models/app_DB_Schemas_Turnos'),
	Asesor = require('./models/app_DB_Schemas_Users'),
	Tienda = require('./models/app_DB_Schemas_BranchOffices'),
	Subservicio = require('./models/app_DB_Schemas_Services'),
	rutas = require('./rutas/rutas');

		mongoose.connect('mongodb://localhost/sistemaTS');
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function (callback) {
			console.log('Conectado a la base de datos MOngoDB')
		});

// Configuration
app.use(express.static(__dirname + '/public'));

rutas(app,Turno,Asesor,Tienda,Subservicio,io,mongoose);

server.listen(port,function(){
	console.log('escuchando en el pueto ' + port);
});

