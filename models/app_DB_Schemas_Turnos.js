
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
		},
		branchOffice:{
				branchOfficesName:String,
				posCode:Number,
				city:String,
				region:String,
				blueCircle: {
					idClircle: String,
					nameCircle: String,
					type: String,
					termimal: {
						terminalId: String,
						terminalName: String,
						location: String
					}
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
