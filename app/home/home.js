'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope','$http', 'authUsers','sesionesControl','$location',function($scope,$http,authUsers,sesionesControl,$location) {
	$scope.usuario = sesionesControl.get("usuario");
	$scope.logout = function(){	authUsers.logout();	};
	$scope.isActive = function(path){ return ($location.path()==path) } 


}]);