'use strict';

var reg = angular.module('myApp.registro', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/registro', {
		templateUrl: 'registro/registro.html',
		controller: 'RegistroCtrl'
	});
}])

.controller('RegistroCtrl', ['$scope','$http','$rootScope','$location', 'authUsers','$timeout',function($scope,$http,$rootScope,$location, authUsers,$timeout) {
		
	 $scope.user = { usuario:"",email : "", password : "" }
    authUsers.flash = "";
    //función que llamamos al hacer sumbit al formulario
    $scope.sigin = function(){
    	if($scope.formreg.$valid){
	        authUsers.sigin($scope.user);
	        $scope.registrado=true;
	        $timeout(function(){
	        	
	 			authUsers.login($scope.user);
	        }, 1);
        }
    }


	$scope.validarNombre = function(){
    var url = 'https://votosya-focoman.c9.io/user/existe'+ "?callback=JSON_CALLBACK&usuario="+$scope.user.usuario;
    console.log(url);
		$http.jsonp(url)
		.success(function(data){
			if(data.respuesta=="si"){
				$scope.formreg.inputUsuario.$setValidity("nombreExistente", false);
				$scope.usuarioBlur = $scope.user.usuario;
			}	else if(data.respuesta=="no")	{
				$scope.formreg.inputUsuario.$setValidity("nombreExistente", true);
			}   else  {
				console.log("Ocurrio un error!!!")
			}
		})
		.error(function(data){
			console.log("Error"+data);
		});
		
	}

	 var fetchDataDelay = 500;   // milliseconds
    var fetchDataTimer;

    $scope.fetchData = function () {
        $timeout.cancel(fetchDataTimer);
        fetchDataTimer = $timeout(function () {
            $scope.validarNombre();
        }, fetchDataDelay);
    };
}]);

app.directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;


        //console.log(val1 === val2);
        // set validity
        ngModel.$setValidity('equals', val1 === val2);
      };
    }
  }
});
