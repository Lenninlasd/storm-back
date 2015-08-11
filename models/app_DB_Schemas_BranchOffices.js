var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con una Tienda
var branchOfficeSchema = mongoose.Schema({
	branchOffice:{
		branchOfficesName:String,
		posCode:String,
		city:String,
		region:String,
		blueCircles: [{ // lista de circulos que generan turno
			idClircle: String,
			nameCircle: String,
			type: String,
			termimals: [{
				terminalId: String,
				terminalName: String,
				location: String
			}]
		}],
		data: {
			type: String,
		}
	}
});

var BranchOffice = mongoose.model('BranchOffice',branchOfficeSchema,'BranchOffices');

module.exports = BranchOffice;

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
