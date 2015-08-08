greenCircle: [{// lista de agrupación de kpi (visualización)
		idGreenCircle: String,
		nameCircle: String,
		branchOffices:[{
			nombreSucursal:String,
			codigoPos:String,
			ciudad:String,
			regional:String,
			blueCircles: [{ // lista de circulos que generan turno
				idClircle: String,
				nameCircle: String,
				type: String
			}]
		}]
}]
