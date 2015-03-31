'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.home',
  'myApp.registro',
  'myApp.nav',
  'myApp.listado',
  'myApp.version',
  'myApp.crearEncuesta',
  'myApp.encuesta',
]).
config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  $httpProvider.defaults.useXDomain = false;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);
