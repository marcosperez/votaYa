'use strict';

angular.module('myApp.listado', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/encuestas/listado', {
		templateUrl: 'encuestas/listado/listado.html',
		controller: 'ListadoCtrl'
	});
}])

.controller('ListadoCtrl', ['$scope','$http', 'authUsers','sesionesControl','$location','factEncuestas','$timeout',
	function($scope,$http,authUsers,sesionesControl,$location,factEncuestas,$timeout) {
		$scope.usuario = sesionesControl.get("usuario");
		$scope.logout = function(){	authUsers.logout();	};
		$scope.isActive = function(path){ return ($location.path()==path) } 
		$scope.encuestas = [];

		//Eliminar encuestas. Se llama a la factoria encuestas para que realize un peticion de eliminacion al servidor.
		$scope.eliminarEncuesta = function(id,index){
			factEncuestas.eliminar(id)
			.success(function(datos){console.log(datos),$scope.encuestas.splice(index,1);})
			.error(function(datos){	console.log("Error no se pudo eliminar la encuesta");})
		}

		//Obtener Json de encuestas. Se llama a la factoria de encuestas para que realize una peticion al servidor.
		factEncuestas.listado($scope.usuario)
		.success(function(d){$scope.encuestas = d; console.log(d)})
		.error(function(d){console.log("Error no se pudo recuperar las encuestas "+d)});
		

		$scope.ultimoIndex = 99999;

		$scope.mostrarContenido = function(event,index){

			//console.log($(event.currentTarget).find(".contenidoAcordion"));
			$(event.currentTarget).find(".contenidoAcordion").switchClass( "contenidoAcordion", "contenidoAcordionVisible", 1000, "easeInOutQuad" );
			$(event.currentTarget).switchClass("encuesta","encuestaSinHover",1000);
			$(event.currentTarget).switchClass("encuesta","encuestaSinHover",1000);
			$(".encuestaSinHover").switchClass("encuestaSinHover","encuesta",1000);
			$(".contenidoAcordionVisible").switchClass( "contenidoAcordionVisible","contenidoAcordion" , 1000, "easeInOutQuad" );
			
			if($scope.ultimoIndex!=index){			
				//console.log($(event.currentTarget).find("#myChart"));
				$scope.ultimoIndex = index;
				var ctx = $(event.currentTarget).find("#myChart").get(0).getContext("2d");
				var dataTorta=[];

				var colores = [ 'orange', 'purple', 'red', 'yellow','green','blue', "#FDB45C","#949FB1","#616774",'aqua',
								'lime', 'maroon', 'navy', 'olive',   'black',  'fuchsia', 'gray', 'silver', 'teal'];

				for (var i = $scope.encuestas[index].respuestas.length - 1; i >= 0; i--) {
					dataTorta.push({value:$scope.encuestas[index].respuestas[i].cantidad
						,color:colores[i]
						,label:$scope.encuestas[index].respuestas[i].valor,
						//highlight: "#FF5A5E",
						legend:true,
					});
					//console.log($scope.encuestas[index].respuestas[i].cantidad);
				};

				$scope.redondel = new Chart(ctx).Doughnut(dataTorta);

			}
		}

		




	//Chart.defaults.global.responsive = true;
	// Get context with jQuery - using jQuery's .get() method.
	/*var ctx = $("#myChart").get(0).getContext("2d");
	var ctxRedondo = $("#myChartRedodno").get(0).getContext("2d")
	// This will get the first returned node in the jQuery collection.
	
	$scope.data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
		{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40]
		},
		{
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90]
		}
		]
	};


	$scope.dataTorta = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }

	];

	var myLineChart = new Chart(ctx).Line($scope.data);
	$scope.redondel = new Chart(ctxRedondo).PolarArea($scope.dataTorta);*/
}]);