'use strict';

var phonecatApp = angular.module('distrito35', [
	'ngRoute',
	'distrito35Controllers'
]);

phonecatApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'pages/home.html',
				controller: 'HomeCtrl'
			}).
			when('/distrito', {
				templateUrl: 'pages/district.html',
				controller: 'DistrictCtrl'
			}).when('/grupos', {
				templateUrl: 'pages/groups.html',
				controller: 'GroupsCtrl'
			}).when('/grupos/:city', {
				templateUrl: 'pages/groups.html',
				controller: 'GroupsCtrl'
			}).when('/grupo/:groupNumber', {
				templateUrl: 'pages/groupDetail.html',
				controller: 'GroupDetailCtrl'
			}).when('/comissao-distrital', {
				templateUrl: 'pages/team.html',
				controller: 'TeamCtrl'
			}).when('/calendario', {
				templateUrl: 'pages/calendar.html',
				controller: 'CalendarCtrl'
			}).when('/downloads', {
				templateUrl: 'pages/downloads.html',
				controller: 'DownloadsCtrl'
			}).otherwise({
				redirectTo: '/home'
			});
	}
]);
