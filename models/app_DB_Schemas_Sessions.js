var mongoose = require('mongoose');

// Esquema que define totalmente toda la informacion que se relaciona con un Asesor
var userSchema = mongoose.Schema({
    idSession:String,
	ipAddress: String,
    userEmail:String,
    userAgent:String,
    creationDate:Date,
});
// coleccion de passwords usados
var Session = mongoose.model('Session',userSchema,'sessions');

module.exports = Session;
