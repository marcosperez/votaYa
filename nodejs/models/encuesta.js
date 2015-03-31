module.exports = function(app) {
	var mongoose = app.config.bd;
	var Schema = mongoose.Schema;


	var encuestaSchema = new Schema({
		usuario:  Schema.Types.ObjectId,
		pregunta: String,
		cantidad:Number,
		respuestas: [{type: Schema.Types.ObjectId , ref:'Respuesta'}],
		url: String,
	});

	return mongoose.model('Encuesta', encuestaSchema);
}