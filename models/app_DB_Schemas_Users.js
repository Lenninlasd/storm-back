var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un Asesor
var userSchema = mongoose.Schema({
	user:{
        user:String,
		email: String,
        password:String,
    	name:String,
        lastName:String,
    	idUser:String,
        idType:String,
        userType:String,
        creationDate:Date,
        circleList:{
            greenCircles:[{
                idGreenCircle: String,
                nameCircle: String
            }],
            branchOffices:[{
				branchOfficesName:String,
				posCode:String,
				city:String,
				region:String,
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
