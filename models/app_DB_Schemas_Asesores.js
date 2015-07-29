var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un Asesor
var asesorSchema = mongoose.Schema({
	asesor:{
    	nombreAsesor:String,
    	idAsesor:String,
    	sucursal:{
    		nombreSucursal:String,
    		codigoPos:Number,
    		regional:String,
    		terminal:String
    	}
    }
});

var Asesor = mongoose.model('Asesor',asesorSchema,'asesores');

module.exports = Asesor;
