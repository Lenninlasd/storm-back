
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	mongoose = require('mongoose'),
	db = mongoose.connection,
	cors = require('cors'),
	port = 3001,

	// // Cargo las rutas de la API
	routes = require('./rutas/routes');

mongoose.connect('mongodb://localhost/sistemaTS');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
		console.log('Conectado a la base de datos MOngoDB');
});

// Configuration
app.use(cors());

routes(app, io, mongoose);


server.listen(port,function(){
	console.log('escuchando en el pueto ' + port);
});
