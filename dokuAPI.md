**Documentación API FLugel Strom**
-

La siguiente lista muestra todas la rutas que implementa la API para la gestión de la información.

### **Rutas**

Se hará una clasificacion de las rutas por su relaccion directa con la coleccion a la que pertenecen

1. **Tokens**
	- /tokens (**Get** , **Post**)
	- /callToken ( **Post**)
	- /takeToken ( **Put**)
	- /closeToken ( **Put**)
	- /abandorningToken ( **Put** )
2. **Services**
	- /services ( **Get** , **Post**, **Put**, **Delete**)
3. **Activities**
	- /activity ( **Get** , **Post**, **Put**, **Delete**)
4. **Tiendas**
	- /tiendas ( **Get** , **Post**, **Put**, **Delete**)
5. **Users**
	- /users ( **Get** , **Post**, **Put**, **Delete**)

**Rutas, Metodos y Estructura de Información**
-
### :clipboard: **/turnos [get]**
> Esta ruta puede ser utilizada con o sin parametros, los parametros que acepta esta ruta son:
> **id** , **state [0, 1, 2, 3, 4]** , **receiverAdviserId**
> 
> un ejemplo de como se veria una consulta con utilizando parametros es el siguiente :
>```
	>/tokens?id=5632636045a5a661151c49e1&state=4&receiverAdviserId=1143121813

> **Devuelve una colecccion de objetos con la siguiente estrucctura:**

```javascript

token:{
		idToken: {
			numerator: String,
			consecutive: Number
		},
		state: {
			stateCode: Number,
			description: String
		},
		motivoVisita: {
			serviceName:String,
			serviceId:String
		},
		emitterAdviser:{
				adviserName:String,
				adviserLastName:String,
				adviserId:String,
				adviserEmail: String
		},
		receiverAdviser:{
				adviserName:String,
				adviserLastName:String,
				adviserId:String,
				adviserEmail: String
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
	
		infoToken:{
				logCreationToken:Date,
				logCalledToken:Date, // Date
				logAtentionToken:Date,
				logEndToken:Date, // Date
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
				}],
				observation:String
		}
	}
    
```
### :pencil: **/tokens [Post]**
> Corresponde a la creación de un turno y el request body debe tener la siguiente estructura:

```javascript
{
	numerator:String,
	consecutive:Number,							
	lineNumber:Number,
	screenName:String,
	adviserName:String,
	adviserLastName:String,
	adviserId:String,
	adviserEmail:String,
	service.serviceName:String,
	service.serviceId:String
}
```
### :pencil: **/callToken [Put]**
> Método que se utiliza cuando el asesor llama el turno, el req.body debe tener la **id** del turno en cusestion.

### :pencil: **/takeToken [Put]**
> Método que se utiliza cuando el asesor toma el turno, la peticion debe tener el parametro **id** y el req.body la siguiente estrucctura:

```javascript
{
	adviserName:String,
	adviserLastName:String,
	adviserId:String,
	adviserEmail:String
}	
```

### :pencil: **/closeToken [Put]**
> Método que se utiliza cuando el asesor va a terminar con la atencion de el turno, el req.body debe tener la **id** del turno en cusestion.

### :pencil: **/abandoningToken [Put]**
> Método que se utiliza cuando el asesor va a cancelar el turno por abandono, el req.body debe tener la **id** del turno en cusestion.



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

