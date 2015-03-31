'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl: 'view1/view1.html',
		controller: 'View1Ctrl'
	});
}])

.controller('View1Ctrl', ['$scope','$http','$rootScope','$location', 'authUsers',function($scope,$http,$rootScope,$location, authUsers) {
		
	 $scope.user = { email : "", password : "" }
    authUsers.flash = "";
    //función que llamamos al hacer sumbit al formulario
    $scope.login = function(){
        authUsers.login($scope.user);
    }

	/*$scope.login = function(){
		$http.get('http://localhost:3000/user/autenticacion',{
			params: {
				usuario: $scope.usuario,
				pass: $scope.password
			}
		})
		.success(function(data){
			$rootScope.conectado= data.resultado;
			console.log("Resultado: "+data.resultado);
			if(data.resultado){
				$location.path('/view2')
			}
		})
		.error(function(data){
			console.log("Error"+data);
		});
	}*/

}]);