module.exports = function(app) {
	var mongoose = app.config.bd;
	var Schema = mongoose.Schema;


	var schema = new Schema({
		encuesta:  {type: Schema.Types.ObjectId , ref:'Encuesta'},
		valor: String,
		cantidad: Number,
		telefonos: [{type: Schema.Types.ObjectId , ref:'Telefono'}],
	});

	return mongoose.model('Respuesta', schema);
}