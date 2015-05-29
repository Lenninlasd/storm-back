var mongoose = require('mongoose'); 

// Esquema que define totalmente toda la informacion que se relaciona con un Asesor
var asesorSchema = mongoose.Schema({
	asesor:{
    	nombre_aesesor:String, 
    	id_asesor:String,
    	sucursal:{
    		nombre_sucursal:String, 
    		codigo_pos:Number,
    		regional:String,
    		terminal:String
    	}    	
    },
    total_tiempo_laboral:String,
    tiempo_total_atencion:String,
    total_turnos_atendidos:String,
    tiempo_atencion_promedio:String
    // 
});

var Asesor = mongoose.model('Asesor',asesorSchema,'TodosAsesores');

module.exports = Asesor;