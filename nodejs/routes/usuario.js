module.exports = function(app) {


	app.route('/user/autenticacion')
	.get(function(req, res, next) {
		console.log("Peticion de autenticacion");
		console.log("usuario: "+req.query.usuario);
		console.log("pass: "+req.query.pass);
	//console.log(usuario);
	app.models.usuario.find({ usuario: req.query.usuario },function (err, usuario) {
		if (err) return console.error(err);
	  //console.log("el nombre es: "+usuario[0].usuario);
	  if(usuario[0]){
	  	console.log("la pass es: "+usuario[0].pass);
	  	if(usuario[0].pass == req.query.pass){
	  		res.json({respuesta:"success"})
	  	}	else	{
	  		res.json({respuesta:"failed"})
	  	}
	  }
	})
	
})

	app.route('/user/existe')
	.get(function(req, res, next) {
		console.log("Peticion de existencia de usuario");
		console.log("usuario: "+req.query.usuario);

		app.models.usuario.find({ usuario: req.query.usuario },function (err, usuario) {
			if (err) return console.log(err);
	  //console.log("el nombre es: "+usuario[0].usuario);
	  console.log("Buscadooooo");
	  if(usuario[0]){
	  	res.json({respuesta:"si"});
	  }	else	{
	  	console.log("No existe");
	  	res.json({respuesta:"no"});
	  }

	})

	})

	app.route('/user/registro')
	.get(function(req, res, next) {
		console.log("Peticion de registro de usuario");
		console.log("usuario: "+req.query.usuario);

		var usuario = new app.models.usuario({ usuario:req.query.usuario , pass:req.query.pass})

		usuario.save(function (err, usuario) {
			if (err) return console.error(err);
			console.log("usuario guardado exitosamente")
		});

		res.json({respuesta:"registrado"});

	})

	app.route('/user/logout')
	.get(function(req, res, next) {
		console.log("sesion cerrada") ;
		res.json({respuesta:"success"})
	})

};