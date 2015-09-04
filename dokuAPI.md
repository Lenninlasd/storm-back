Documentación API FLugel Strom
===================


La siguiente lista muestra todas la rutas que implementa la API para la gestión de la información.
  **Rutas** 

 1. /turnos (Get , Post)
 2. /takeTurnos (Put)
 3. /cerrarTurnos (Put)
 4. /services ( Get , Post, Put, Delete)

Rutas, Metodos y Estructura de Información 
-

#### **<i class="icon-file"></i> /turnos [get]**
> Devuelve una colecccion de objetos con la siguiente estrucctura
```
 turno:{
		idTurno: {numerador: String,
		consecutivo: Number},
		state: { 
			stateCode: Number,
			description: String
		},
				motivoVisita:String,
				emitterAdviser:{
				adviserName:String,
				adviserLastName:String,
				adviserId:String,
		},
		receiverAdviser:{
				adviserName:String,
				adviserLastName:String,
				adviserId:String,
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
		client:{
				lineNumber:Number,
				screenName:String,
				clientName:String,
				idNumber:Number,
				idType:String
		},
		infoTurno:{
				logCreacionTurno:Date,
				logLlamado:Date,
				logAtencion:Date,
				logFin:Date, 
				area:String,
				categoriaCliente:String,
				services: [{
					serviceName:String,
					serviceId:String,
					subServices:[{
						subServiceId:String,
						subServiceName:String,
						description:String,
						numerador:String,
						categorie:String
					}]
				}],
				observation:String
		}
	}
```

#### **<i class="icon-file"></i> /turnos [Post]**
> Corresponde a la creación de un turno y respeta la siguiente estructura

```
{	
'turno.idTurno.numerador':'AB',			'turno.idTurno.consecutivo':req.body.consecutivo,
'turno.state.description':'Pendiente por Atencion',
'turno.client.lineNumber':req.body.lineNumber,
'turno.client.screenName':req.body.screenName,
'turno.motivoVisita':req.body.motivoVisita,			'turno.emitterAdviser.adviserName':req.body.adviserName,		'turno.emitterAdviser.adviserLastName':req.body.adviserLastName,			'turno.emitterAdviser.adviserId':req.body.adviserId,
'turno.infoTurno.logCreacionTurno':new Date()
	}
```


#### **<i class="icon-file"></i> /taketurnos [Put]**
> Método que se utiliza cuando el asesor toma el turno 
```
{
'turno.state':'En Atencion',			'turno.receiverAdviser.adviserName':req.body.adviserName,		'turno.receiverAdviser.adviserLastName':req.body.adviserLastName,			'turno.receiverAdviser.adviserId':req.body.adviserId,		'turno.branchOffice.branchOfficesName':req.body.circleList.branchOffices[0].nombreSucursal,			'turno.branchOffice.posCode':req.body.circleList.branchOffices[0].codigoPos,			'turno.branchOffice.city':req.body.circleList.branchOffices[0].ciudad,			'turno.branchOffice.region':req.body.circleList.branchOffices[0].regional,
'turno.infoTurno.logAtencion':new Date()
}
```

#### **<i class="icon-file"></i> /cerrarTurno[Put]**
>  Se utliza para terminar con la atención al turno
```
{
			'turno.infoTurno.area':req.body.turno.infoTurno.area,			'turno.infoTurno.categoriaCliente':req.body.turno.infoTurno.categoria_cliente,
'turno.state':'Atendido',			'turno.infoTurno.services':req.body.turno.infoTurno.services,
'turno.infoTurno.logFin':new Date()
```