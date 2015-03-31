'use strict';

angular.module('myApp.crearEncuesta', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/encuestas/crear', {
		templateUrl: 'encuestas/crear/crear.html',
		controller: 'CrearCtrl'
	});
}])

.controller('CrearCtrl', ['$scope','$http', 'authUsers','sesionesControl','$location','factEncuestas',"utiles",
	function($scope,$http,authUsers,sesionesControl,$location,factEncuestas,utiles) {
	$scope.usuario = sesionesControl.get("usuario");
	$scope.logout = function(){	authUsers.logout();	};
	$scope.isActive = function(path){ return ($location.path()==path) } 

	$scope.encuesta = {pregunta:"",respuestas:[{valor:""},{valor:""}]};
	
	$scope.agregarRespuesta = function($event){
		//console.log($event.currentTarget);
		$event.currentTarget.style.visibility = "hidden";
		$scope.encuesta.respuestas.push({valor:""});
	}

	$scope.crearEncuesta = function(){
		console.log($scope.encuesta);
		utiles.cargar($("body div"));
		factEncuestas.crear($scope.usuario,$scope.encuesta);
	}
}]);