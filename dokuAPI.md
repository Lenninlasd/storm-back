Documentación API FLugel Strom
===================


La siguiente lista muestra todas la rutas que implementa la API para la gestión de la información.

**Rutas** 

 1. /turnos (Get , Post)
 2. /takeTurnos (Put)
 3. /cerrarTurnos (Put)
 4. /services ( Get , Post, Put, Delete)
 5. /tiendas (Get, Post, Put, Delete)
 6. /users (Get, Post, Put, Delete)
 7. /circles
 8. /activities

Rutas, Metodos y Estructura de Información 
-

#### **<i class="icon-file"></i> /turnos [get]**
> Devuelve una colecccion de objetos con la siguiente estrucctura
```javascript
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
> Corresponde a la creación de un turno y el request body debe tener la siguiente estructura:

```javascript
{
	numerator: String,
	consecutive: Number,
	lineNumber:Number,
	screenName:String,
	motivoVisita:String,
	adviserName:String,
	adviserLastName:String,
	adviserId:String
}

```


#### **<i class="icon-file"></i> /taketurnos [Put]**
> Método que se utiliza cuando el asesor toma el turno, el req.body debe tener la siguiente estrucctura:
```javascript
{
adviserName:String,
adviserLastName:String,
adviserId:String,
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
			}
}

```

**<i class="icon-file"></i> /cerrarTurno[Put]**>  
>Se utliza para terminar con la atención al turno,el req.body debe tener la siguiente estrucctura:

```javascript
{
	area:String,
	clientCategorie:String,
	services: [{
				serviceName:String,
				serviceId:String,
				subServices:[{
					subServiceId:String,
					subServiceName:String,
					description:String,
					numerator:String,
					categorie:String
					}]
              }]
 }

```


**<i class="icon-file"></i> /services[Get]**>  
>Se utliza para llamar atodos los servicios , devuelve una colecccion de objetos con la siguiente estrucctura:


```javascript
{
	service:{
		serviceId:String,
		serviceName:String,
		subServices:[{
			subServiceId:String,
			subServiceName:String,
			description:String,
			numerador:String,
			categorie:String
		}]
	}
 }

```

**<i class="icon-file"></i> /services[Post]**>  
>Se utliza para crear un nuevo servicio , el req.body debe tener la siguiente estrucctura:


```javascript
{
		serviceId:String,
		serviceName:String,
		subServices:[{
			subServiceId:String,
			subServiceName:String,
			description:String,
			numerator:String,
			categorie:String
		}]
	}
 }

```

**<i class="icon-file"></i> /services[Put]**>  
>Se utliza para editar un servicio , el query debe contener el parametro 'id' para encontrar el servicio y  el req.body debe tener la siguiente estrucctura:


```javascript
{
		serviceId:String,
		serviceName:String,
		subServices:[{
			subServiceId:String,
			subServiceName:String,
			description:String,
			numerator:String,
			categorie:String
		}]
	}
 }

```

**<i class="icon-file"></i> /services[Delete]**>  
>Se utliza para eliminar un servicio , el query debe contener el parametro 'id' para encontrar el servicio:
```javascript 
> ejemplo /servicio/967362718238716372
```