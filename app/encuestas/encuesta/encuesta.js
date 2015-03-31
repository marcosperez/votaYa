'use strict';

angular.module('myApp.encuesta', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/encuesta/:url', {
		templateUrl: 'encuestas/encuesta/encuesta.html',
		controller: 'EncuestaCtrl'
	});
}])

.controller('EncuestaCtrl', ['$scope','$http', 'authUsers','sesionesControl','$location','factEncuestas','$timeout','$routeParams',
	function($scope,$http,authUsers,sesionesControl,$location,factEncuestas,$timeout,$routeParams) {
		
		$scope.usuario = sesionesControl.get("usuario");
		$scope.logout = function(){	authUsers.logout();	};
		$scope.isActive = function(path){ return ($location.path()==path) } 
		$scope.url = $routeParams.url;
		//console.log("La url es :" + $routeParams.url);


		var socket = io.connect('https://votosya-focoman.c9.io/');
		socket.emit('conectar a sala', { sala: $scope.url  });
		socket.on('conexion', function (data) {
			console.log(data);	
			$scope.encuesta= data;
			//console.log($scope.encuesta.pregunta);
			$scope.mostrarTitulo = true;
			$scope.$apply();
	
			
			var ctx = document.getElementById("myChart").getContext("2d");
			var dataTorta=[];

			var colores = [ 'orange', 'purple', 'red', 'yellow','green','blue', "#FDB45C","#949FB1","#616774",'aqua',
			'lime', 'maroon', 'navy', 'olive',   'black',  'fuchsia', 'gray', 'silver', 'teal'];

			for (var i = $scope.encuesta.respuestas.length - 1; i >= 0; i--) {
				
				dataTorta.push({
					value:data.respuestas[i].cantidad
					,color:colores[i]
					,label:data.respuestas[i].valor,
					//highlight: "#FF5A5E",
					legend:true,
				});
				//console.log($scope.encuestas[index].respuestas[i].cantidad);
				$(".legend").
				append("<div class='col-md-12 bottonSeleccion' "+
					"style='background-color:"+colores[i]+"'>"+
					data.respuestas[i].valor 
					+"</div>");

				
			};
			
			$scope.redondel = new Chart(ctx).PolarArea(dataTorta,{responsive:true});
			//$scope.redondel.defaults.global.responsive=true;
			
			
			$(".bottonSeleccion").click(function(event) {
				//console.log("votaaaaa");
				socket.emit('votar', { voto: $(event.target).text() , encuesta: $scope.encuesta._id});
			});
			$scope.$apply();

			socket.on('voto',function(datos){
				console.log($scope.redondel.segments);

				for (var i = $scope.redondel.segments.length - 1; i >= 0; i--) {
					if($scope.redondel.segments[i].label==datos.valor)
						$scope.redondel.segments[i].value++;
				};
				
				$scope.redondel.update();
				
			});

		});		

function generarGrafico(){

}
}]);