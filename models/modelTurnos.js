var mongoose = require('mongoose');

var turnoSchema = mongoose.Schema({
	turno:{
		codigo_turno:String,
		estado:String,
		// Proceso de toma de turno por parte del cliente.
		toma_de_turno:{ 
			numero_linea_tigo:Number,
			nombre_pantalla:String,
			motivo_visita:String,
			hora_asignacion_tuno:String
		},
		// Proceso de Atencion del turno Por parte del Asesor
		atencion_a_turno:{
			// Datos de la terminal que atiende el Turno
			terminal:{
				estado:String,
				codigo_terminal:String,
				codigo_asesor:String,
				hora_inicio_atencion:String,
				hora_fin_atencion:String				
			},
			// Datos del Cliente Atendido.
			cliente:{
				nombre:String,
				numero_documento:Number,
				tipo_documento:String
			},
			// Datos de la atencion al turno
			infoTurno:{
				tiempo_espera:String,
				area:String,
				categoria_cliente:String,
				servicio:{nombre:String,sid:String},
				sub_servicio:{nombre_subservicio:String,descripcion:String,numerador:String,categoria:String},
				observacion:String
			}
		}
	}
});

var servicioSchema = mongoose.Schema({	
		servicio:String,
		sub_servicios:[ 
			{nombre_subservicio:String,descripcion:String, numerador:String, categoria:String }						
		]
	});

var Turno = mongoose.model('Turno',turnoSchema,'Todosturnos');

var Servicio = mongoose.model('Servicio',servicioSchema,'EstructuraServicio');

module.exports = Turno;