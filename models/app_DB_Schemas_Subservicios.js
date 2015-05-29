var mongoose = require('mongoose');

var subservSchema = mongoose.Schema({
	subservicio:{
		nombre_subservicio:String,
		descripcion:String,
		numerador:String,
		categoria:String,
		serv_id:String  // codigo del servicio al que pertenece
	}
});

var SubServicio = mongoose.model('SubServicio',subservSchema,'TodosSubservicios');

module.exports = SubServicio;

// Codigo para meter toda un coleccion de subservicios-- es ncesario preparar un poco el subservicios.json

// $scope.crearsub = function(){

// 		$http.post('/Subservicios', $scope.subservicios).success(function (res ){
// 			console.log(res);
// 		});
// 	};

// app.post('/Subservicios', function (req,res){
// 		Subservicio.collection.insert(req.body, function (err,array){
// 			res.json(array);
// 		});

// 	});