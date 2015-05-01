var bodyParser = require('body-parser');
var express = require('express');

var app = express();
module.exports = function(){

	app.get('/Turnos',function (req,res){
	Turno.find(function (err,ueso){
		res.json(ueso);
	});
	
});
// Post para crear un nuevo turno
app.post('/Turnos',function (req,res){
	console.log(req.body);
	Turno.create({
		'turno.estado':'Pendiente por Atencion',
		'turno.toma_de_turno.numero_linea_tigo':req.body.numero_linea_tigo,
		'turno.toma_de_turno.nombre_pantalla':req.body.nombre_pantalla,
		'turno.toma_de_turno.motivo_visita':req.body.servObj.nombre,
		'turno.atencion_a_turno.infoTurno.servicio':req.body.servObj,
		'turno.atencion_a_turno.terminal.estado':'libre'
	},function (err, uso){
		res.json(uso);
		// console.log(uso);
	});
});
// get para meter mas info en el turno
app.get('/Turnos/:id',function (req,res){
	var id = req.params.id;
	Turno.findById(id,function (err, results){
		if (err)
			res.send(err);
		res.json(results);
		// console.log(results);
	});
});

// put para meter masinfo en el turno
app.put('/Turnos/:id',function (req,res){
	var id = req.params.id;
	console.log('este es el id a actaualizar',id, req.body);
	Turno.findByIdAndUpdate(id,{
		'turno.atencion_a_turno.codigo_terminal':req.body.codigo_terminal,
		'turno.atencion_a_turno.codigo_asesor':req.body.codigo_asesor
	},
	// 

	{new:true},
	function (err,results){
		res.json(results);
		console.log(results);
	});
});


// get para Tomar el turno
app.get('/takeTurnos/:id',function (req,res){
	var id = req.params.id;
	Turno.findById(id,function (err, results){
		if (err)
			res.send(err);
		res.json(results);
		// console.log(results);
	});
});

// put para Tomar el turno
app.put('/takeTurnos/:id',function (req,res){
	var id = req.params.id;
	console.log('este es el id a actaualizar',id, req.body);
	Turno.findByIdAndUpdate(id,{
		'turno.estado':'En Atencion'		
	},
	// 

	{new:true},
	function (err,results){
		res.json(results);
		console.log(results);
	});
});

// put para cerrar el turno
app.put('/cerrarTurno/:id',function (req,res){
	var id = req.params.id;
	Turno.findByIdAndUpdate(id,{
		'turno.atencion_a_turno.infoTurno.tiempo_espera':req.body.infoTurno.tiempo_espera,
		'turno.atencion_a_turno.infoTurno.area':req.body.infoTurno.area,
		'turno.atencion_a_turno.infoTurno.categoria_cliente':req.body.infoTurno.categoria_cliente,
		'turno.atencion_a_turno.infoTurno.servicio':req.body.infoTurno.servicio,
		'turno.atencion_a_turno.infoTurno.sub_servicio':req.body.infoTurno.sub_servicio
	},
	// 
	{new:true},
	function (err,results){
		res.json(results);
		console.log(results);
	});

});
};

