var app = angular.module('zions', ['ngRoute', 'highcharts-ng']);

	app.config(function($routeProvider){

	$routeProvider
	  	.when('/', {
	  		templateUrl: './views/home.html',
	  		controller: 'homeCtrl'	
	  	})
	  	.when('/chart', {
	  		templateUrl: './views/chart.html',
	  		controller: 'chartCtrl'	
	  	})
	  	.otherwise({
	  		redirectTo: '/'
	  	})




	});