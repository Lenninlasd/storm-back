var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un Asesor
var userSchema = mongoose.Schema({
	user:{
        user:String,
        password:String,
    		name:String,
        lastName:String,
    		idUser:String,
        idType:String,
        role:String,
        creationDate:Date,
        circleList:{
            greenCircles:[{
                idGreenCircle: String,
                nameCircle: String
            }],
            branchOffices:[{
                nombreSucursal:String,
                codigoPos:String,
                ciudad:String,
                regional:String,
                blueCircles:[{
                    idClircle: String,
                    nameCircle: String
                }],
            }]
        }
    }

});
// coleccion de passwords usados
var User = mongoose.model('Users',userSchema,'users');

module.exports = User;
