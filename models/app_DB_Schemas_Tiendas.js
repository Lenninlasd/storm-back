var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con una Tienda
var tiendaSchema = mongoose.Schema({
	tienda:{
		nombreSucursal:String,
		codigoPos:String,
		ciudad:String,
		regional:String
	}
});

var Tienda = mongoose.model('Tienda',tiendaSchema,'tiendas');

module.exports = Tienda ;

//codigo en app.js para guardar toda la collecion de una sola vez 

// $scope.crearTiendas = function(){
// 		console.log('se llamo a la funcion')
// 		$http.post('/Tiendas',$scope.tiendas).success(function(res){
// 			console.log('se guardo todas las tiendas :',res);
// 		});
// 	};

// codigo en rutas js para cguardar toda la coleccion de una vez

// app.post('/Tiendas',function (req,res){
// 	Tienda.collection.insert(req.body,function (err,array){
// 		res.json(array);
// 	});
// });