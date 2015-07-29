
var mongoose = require('mongoose');

// Esquema que define totalmente toda la información que se realciona con un turno.
var turnoSchema = mongoose.Schema({
	turno:{
		idTurno: {numerador: String, consecutivo: Number},
		estado:String,
		// Proceso de toma de turno por parte del cliente.
		motivoVisita:String,

		// Datos de la Asesor-Terminal y Tienda donde se ateinde al turno
		asesor:{
				nombreAsesor:String,
				idAsesor:String,
				sucursal:{
						nombreSucursal:String,
						codigoPos:Number,
						ciudad:String,
						regional:String,
						terminal:String
				}
		},
			// Datos del Cliente Atendido.
		cliente:{
				numeroLinea:Number,
				nombrePantalla:String,
				nombre:String,
				numeroDocumento:Number,
				tipoDocumento:String
		},
		// Datos de la atencion al turno
		infoTurno:{
				logCreacionTurno:Date,
				logLlamado:Date, // Date
				logAtencion:Date,
				logFin:Date, // Date
				area:String,
				categoriaCliente:String,
				servicios: [{
					nombre:String,
					sid:String,
					subServicios:[{
						subSerId:String,
						nombreSubservicio:String,
						descripcion:String,
						numerador:String,
						categoria:String
					}]
				}],
				observacion:String
		}
	}
});

var Turno = mongoose.model('Turno',turnoSchema,'turnos');

module.exports = Turno;
