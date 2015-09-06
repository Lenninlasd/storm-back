
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	mongoose = require('mongoose'),
	db = mongoose.connection,
	cors = require('cors'),
	// bodyParser = require('body-parser'),
	port = 5000,
	// Cargo los Schemnas de las DB
	Turno = require('./models/app_DB_Schemas_Turnos'),
	User = require('./models/app_DB_Schemas_Users'),
	Tienda = require('./models/app_DB_Schemas_BranchOffices'),
	Service = require('./models/app_DB_Schemas_Services'),
	Activity = require('./models/app_DB_Schemas_Activities'),
	Circle = require('./models/app_DB_Schemas_Circles'),
	// Cargo las rutas de la API
	turnos = require('./rutas/turnos'),
	services = require('./rutas/services'),
	tiendas = require('./rutas/tiendas'),
	users = require('./rutas/users'),
	activities = require('./rutas/activities'),
	circles = require('./rutas/circles');

		mongoose.connect('mongodb://localhost/sistemaTS');
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function (callback) {
			console.log('Conectado a la base de datos MOngoDB');
		});

// Configuration
app.use(cors());
app.use(express.static(__dirname + '/public'));

turnos(app,Turno,io,mongoose);
services(app,Service,io,mongoose);
tiendas(app,Tienda,io,mongoose);
users(app,User,io,mongoose);
activities(app,Activity,io,mongoose);
circles(app,Circle,io,mongoose);


server.listen(port,function(){
	console.log('escuchando en el pueto ' + port);
});
