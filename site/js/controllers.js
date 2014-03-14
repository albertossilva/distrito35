'use strict';

var distrito35Controllers = angular.module('distrito35Controllers', []);
window.cache = {};

var setActiveLink = function(name) {
	$('.menu li').removeClass('selected');
	if(name != '') {
		$('.menu a[rel=' + name + ']').parent().addClass('selected');
	}
}


distrito35Controllers.controller(
	'HomeCtrl', 
	['$scope', '$http',function($scope, $http) {
		setActiveLink('');
	}]
);

distrito35Controllers.controller(
	'DistrictCtrl', 
	['$scope', '$http',function($scope, $http) {
		setActiveLink('district');
	}]
);

distrito35Controllers.controller(
	'GroupsCtrl', 
	['$scope', '$routeParams', '$http',function($scope, $routeParams, $http) {
		setActiveLink('groups');
		$scope.cities = {
			taubate: "Taubaté",
			cacapava: "Caçapava",
			lorena: "Lorena",
			tremembe: "Tremembé"
		}
		$scope.groups = window.cache.groups;

		if(window.cache.groups === undefined) {
			$http.get('data/groups.json').success(function(groupsData) {
				window.cache.groups = groupsData;
				$scope.groups = groupsData;
			});
		}

		if($routeParams.city === undefined) {
			$scope.title = "Grupos do 35º Distrito Monteiro Lobato";
			$scope.subtitle = "grupos do 35º Distrito Monteiro Lobato";
			$scope.query = "";
		} else {
			$scope.title = "Grupos Escoteiros em " + $scope.cities[$routeParams.city];
			$scope.subtitle = "grupos Escoteiros em " + $scope.cities[$routeParams.city];
			$scope.query = $routeParams.city;
		}
	}]
);

distrito35Controllers.controller(
	'GroupDetailCtrl', 
	['$scope', '$routeParams', '$http', '$filter',function($scope, $routeParams, $http, $filter) {
		setActiveLink('groups');
		if(window.cache.groups === undefined) {
			$http.get('data/groups.json').success(function(groupsData) {
				var group = $filter('filter')(groupsData, {number: $routeParams.groupNumber} )[0];
				$scope.group = group;
			});
		} else {
			var group = $filter('filter')(window.cache.groups, {number: $routeParams.groupNumber} )[0];
			$scope.group = group;
		}
	}]
);

distrito35Controllers.controller(
	'TeamCtrl', 
	['$scope', '$http',function($scope, $http) {
		setActiveLink('team');
		if(window.cache.team === undefined) {
			$http.get('data/team.json').success(function(teamData) {
				window.cache.team = teamData;
				$scope.team = teamData;
			});
		} else {
			$scope.team = window.cache.team;
		}
	}]
);

distrito35Controllers.controller(
	'CalendarCtrl', 
	['$scope', '$http',function($scope, $http) {
		setActiveLink('calendar');
		if(window.cache.calendarFirstHalf === undefined) {
			$http.get('data/calendar2014FirstHalf.json').success(function(calendarFirstHalfData) {
				window.cache.calendarFirstHalf = calendarFirstHalfData;
				$scope.monthsFirstHalf = calendarFirstHalfData;
			});
		} else {
			$scope.monthsFirstHalf = window.cache.calendarFirstHalf;
		}

		if(window.cache.calendarSecondHalf === undefined) {
			$http.get('data/calendar2014SecondHalf.json').success(function(calendarSecondHalfData) {
				window.cache.calendarSecondHalf = calendarSecondHalfData;
				$scope.monthsSecondHalf = calendarSecondHalfData;
			});
		} else {
			$scope.monthsSecondHalf = window.cache.calendarSecondHalf;
		}
	}]
);