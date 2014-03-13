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
		}
	}]
);