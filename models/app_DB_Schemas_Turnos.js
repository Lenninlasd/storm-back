
var mongoose = require('mongoose');

// Esquema que define totalmente toda la información que se realciona con un turno.
var turnoSchema = mongoose.Schema({
	turno:{
		codigo_turno:String,
		estado:String,
		fecha_creacion_turno:Date,
		// Proceso de toma de turno por parte del cliente.
		toma_de_turno:{ 
			numero_linea_tigo:Number,
			nombre_pantalla:String,
			motivo_visita:String,
		},
		// Proceso de Atencion del turno Por parte del Asesor
		atencion_a_turno:{
			// Datos de la Asesor-Terminal y Tienda donde se ateinde al turno
			asesor:{
				nombre_aesesor:String, 
				id_asesor:String,
				sucursal:{
					nombre_sucursal:String,
					codigo_pos:Number,
					ciudad:String,
					regional:String,
					terminal:String
					}
			},
			// Datos del Cliente Atendido.
			cliente:{
				nombre:String,
				numero_documento:Number,
				tipo_documento:String
			},
			// Datos de la atencion al turno
			infoTurno:{
				tiempo_espera:Date,
				tiempo_llamado:Date,
				area:String,
				categoria_cliente:String,
				servicio:{nombre:String,sid:String},
				sub_servicio:{nombre_subservicio:String,descripcion:String,numerador:String,categoria:String}, // cambiar por una collecion
				observacion:String,
				tiempo_atencion:Date
			}
		}
	}
});

var Turno = mongoose.model('Turno',turnoSchema,'Todosturnos');



module.exports = Turno;