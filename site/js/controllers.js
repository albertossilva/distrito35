'use strict';

if(window.distrito35Controllers === undefined) {
	window.distrito35Controllers = angular.module('distrito35Controllers', []);
}
window.cache = {};

window.setActiveLink = function(name) {
	$('.menu li').removeClass('selected');
	if(name != '') {
		$('.menu a[rel=' + name + ']').parent().addClass('selected');
	}
}

var handlerFullSizeButton = function(selector) {
	$(selector).click(function(){
		var mainContent = $('.main-content');
		mainContent.addClass('full-size');
		$('<button>Voltar</button>')
			.appendTo(mainContent)
			.attr('id', 'btnReturnNormalSize')
			.addClass('btn')
			.addClass('btn-primary').click(function(){
				var self = $(this);
				self.remove();
				mainContent.removeClass('full-size');
			});
		var escHandler = function(e, a){
			if(e.keyCode == 27){
				$('#btnReturnNormalSize').click();
				$(document).unbind("keydown", escHandler);
				return false;
			}
		};
		$(document).bind("keydown", escHandler);
	});
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

var handleCalendar = function(counter, total) {
	//if(counter != total) return;
	var getSpanClassName = function(el) {
		return el[0].className.split(' ')[1]
	}
	var legendsHandle = $('.calendar-legend div:not(.legend)');

	legendsHandle.find('span').attr('rel','show');
	var totalOfLegends = $('.calendar-legend:first span').length;
	legendsHandle.click(function(){
		var checkbox = $(this).find('span');
		var className = getSpanClassName(checkbox);
		var legends = $('.calendar-legend .' + className);
		if(checkbox.html() != 'X') {
			legends.html('X');
		} else {
			legends.html('&nbsp;');
		}
		var legendsUnique = $('.calendar-legend:first span');
		if( (legendsUnique.filter('[rel=hide]').length + 1) == totalOfLegends && checkbox.attr('rel') == 'show') {
			$('.month').show(500);
			$('.event').attr('rel', 'show').show(500);
		} else {
			var className, showValue, events;
			legendsUnique.each(function(_, legend){
				legend = $(legend);
				className = getSpanClassName(legend);
				showValue = legend.html() == 'X' ? 'show' : 'hide';
				events = $('.calendar .' + className);
				events.attr('rel', showValue);
				legendsHandle.find('span.' + className).attr('rel',showValue);
				events[showValue](500);
			});

			$('.month').each(function(_, el) {
				var month = $(el);
				if( month.find('.event[rel=show]').length == 0) {
					month.hide(500);
				} else {
					month.show(500);
				}
			});
		}
	});
}

window.cache.calendars = [];

distrito35Controllers.controller(
	'CalendarCtrl', 
	['$scope', '$http',function($scope, $http) {
		setActiveLink('calendar');
		$scope.calendars = [];
		if(window.cache.calendars[0] === undefined) {
			$http.get('data/calendar2014FirstHalf.json').success(function(calendarData) {
				window.cache.calendars[0] = {};
				window.cache.calendars[0].months = calendarData;
				$scope.calendars[0] = window.cache.calendars[0];
			});
		} else {
			$scope.calendars[0] = window.cache.calendars[0];
		}

		if(window.cache.calendars[1] === undefined) {
			$http.get('data/calendar2014SecondHalf.json').success(function(calendarData) {
				window.cache.calendars[1] = {};
				window.cache.calendars[1].months = calendarData;
				$scope.calendars[1] = window.cache.calendars[1];
			});
		} else {
			$scope.calendars[1] = window.cache.calendars[1];
		}
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			handleCalendar();
			handlerFullSizeButton('#btnFullScreen');
		});

		
	}]
);

distrito35Controllers.controller(
	'DownloadsCtrl', 
	['$scope', '$routeParams', '$http',function($scope, $routeParams, $http) {
		setActiveLink('downloads');

		$scope.groups = window.cache.downloads;
		$scope.search = '';

		$scope.search = function() {
			$scope.groups = window.cache.downloads;
		}

		if(window.cache.downloads === undefined) {
			$http.get('data/downloads.json').success(function(downloadsData) {
				window.cache.downloads = downloadsData;
				$scope.downloads = downloadsData;
			});
		}
	}]
);

var module = distrito35Controllers.directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function ($scope, element, attr) {
			if($scope.$last === true) {
				$timeout(function () {
					$scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
});