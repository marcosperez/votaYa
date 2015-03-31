angular.module('myApp.nav', [])
.controller('navController', ['$scope', function($scope) {
	
}])
.directive('myNav', function() {
  return {
    templateUrl: 'nav/nav.html'
  };
});