module.exports = function(app) {
	var mongoose = app.config.bd;
	var Schema = mongoose.Schema;


	var usuarioSchema = new Schema({
		usuario:  String,
		pass: String,
		encuestas: [{type: Schema.Types.ObjectId , ref:'Encuesta'}],
	});

	return mongoose.model('Usuario', usuarioSchema);
}