var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var load = require('express-load');
app.use(bodyParser());


var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})

var io = require('socket.io')(server);

load('config')
.then('models')
.then('routes')
.into(app);
	
io.on('connection', function (socket) {

	socket.on('conectar a sala', function (data) {
		console.log("Conectando a la sala "+data.sala);
		socket.join(data.sala);

		app.models.encuesta.findOne({url:data.sala},function(err , encuesta){
			app.models.respuesta.populate(encuesta,{path:"respuestas"},function(err,encuesta){
				socket.emit('conexion', encuesta);
			});
		})
	});

	socket.on('votar',function(datos){
		app.models.encuesta.findById(datos.encuesta,function(err , encuesta){
			encuesta.cantidad = encuesta.cantidad+1;
			app.models.respuesta.populate(encuesta,{path:"respuestas"},function(err,encuesta){
				for (var i = encuesta.respuestas.length - 1; i >= 0; i--) {
					//console.log(encuesta.respuestas[i].valor+ " === "+datos.voto)
					if(encuesta.respuestas[i].valor==datos.voto){
						encuesta.respuestas[i].cantidad=encuesta.respuestas[i].cantidad+1;
						encuesta.respuestas[i].save();
						//console.log(encuesta.respuestas[i].cantidad);
						io.to(encuesta.url).emit('voto',{valor:datos.voto});
					}
				};
				
				encuesta.save();
			});
		});
	});
});


//var usuario = new Usuario({ usuario: 'marcos2' , pass:'pass'})

//console.log(usuario.usuario)

/*usuario.save(function (err, usuario) {
  if (err) return console.error(err);
  consolex.log("usuario guardado exitosamente")
});


Usuario.find({ usuario: /^marcos2/ },function (err, usuario) {
  if (err) return console.error(err);
  console.log(usuario)
})*/

//router.get('/usuario', products.getAll);

