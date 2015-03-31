module.exports = function(app) {

	app.route('/encuestas/crear')
	.get(function(req, res, next) {
		//console.log("Encuesta "+req.query.respuestas);
		//console.log("usuario: "+req.query.usuario);

		app.models.usuario.findOne({ usuario: req.query.usuario },function (err, usuario) {
			if (err) return console.error(err);
			console.log("el nombre es: "+usuario.usuario);
			console.log("el id es: "+usuario.id);
			if(usuario){
				var idEncuesta =  app.config.bd.Types.ObjectId();

				var encuesta = new app.models.encuesta({ id: idEncuesta , cantidad:0 , usuario: usuario.id ,
					pregunta:req.query.pregunta,respuestas:[]});

				encuesta.url = req.query.pregunta.replace( /[^-A-Za-z0-9]+/g, '' ).toLowerCase();
				
				for (var i = req.query.respuestas.length - 1; i >= 0; i--) {
					var jsonRespuesta = JSON.parse(req.query.respuestas[i]); 
					
					var respuesta = new app.models.respuesta({encuesta: idEncuesta ,
						valor:jsonRespuesta.valor,
						cantidad:0,
						telefonos:[]});

					//console.log("respuestitaaaaaaaaa: "+jsonRespuesta.valor);
					
					respuesta.save(function (err, res) {
						if (err) return console.error(err);
						console.log("respuesta: "+res.valor+" creada exitosamente.");
					});
					encuesta.respuestas.push(respuesta);
				};



				encuesta.save(function (err, enc) {
					if (err) return res.json({respuesta:"error"});;
					console.log("encuesta: "+enc.pregunta+" creada exitosamente.");
					res.json({respuesta:"creada"});
				});

				usuario.encuestas.push(encuesta._id);

				usuario.save();
			}
		})
})

app.route('/encuestas/listado')
.get(function(req, res, next) {
	
	
	app.models.usuario.findOne({ usuario: req.query.usuario },function (err, usuario) {
		if (err) return console.error(err);
		
		app.models.encuesta.find({usuario: usuario._id},function (err, encuestas) {
			if (err) return console.error(err);
			//console.log(encuestas);
			app.models.respuesta.populate(encuestas,{path:"respuestas"},function(err,encuestas){
				res.json(encuestas);
			})
		})
	});
	
})

app.route('/encuestas/:url')
.get(function(req, res, next) {
		/*app.models.encuesta.populate(usuario,{path:"encuestas"},function(err,encuestas){
			app.models.respuesta.populate(encuestas,{path:"respuestas"},function(err,respuestas){
				res.json(respuestas);
			});
		});*/
	app.models.encuesta.find({ url: req.params.url },function (err, encuestas) {
		if (err) return console.error(err);
		app.models.respuesta.populate(encuestas,{path:"respuestas"},function(err,encuestas2){
			res.json(encuestas2);
			//console.log(encuestas2);
		})
	})
})

app.route('/encuestas/eliminar')
.delete(function(req, res, next) {
	//console.log("aaaaaaaaaaaa eliminar id: "+req.query.id);
	app.models.encuesta.findById(req.query.id, function(err,encuesta){
		//console.log("Borrando encuesta id: "+encuesta.id);
		for (var i = encuesta.respuestas.length - 1; i >= 0; i--) {
			app.models.respuesta.findByIdAndRemove(encuesta.respuestas[i].id);
			console.log("Borrando respuesta id: "+encuesta.respuestas[i].id);
		};
		res.json({resultado:"success"});

		encuesta.remove();
	});

})
}