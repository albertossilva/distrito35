'use strict';

if(window.distrito35Controllers === undefined) {
	window.distrito35Controllers = angular.module('distrito35Controllers', []);
}

var MONTHS_NAME = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
]

var MONTHS_INDEX = {
	"jan": 0,
	"feb": 1,
	"mar": 2,
	"apr": 3,
	"mai": 4,
	"jun": 5,
	"jul": 6,
	"aug": 7,
	"sep": 8,
	"oct": 9,
	"nov": 10,
	"dec": 11
}

window.setActiveLink = function(name) {
	$('.menu li').removeClass('selected');
	if(name != '') {
		$('.menu a[rel=' + name + ']').parent().addClass('selected');
	}
}

var getWeeksByMonth = function(year){
	var firstDayOfYear = new Date(year, 0, 1);
	var dayIncrementer = moment(firstDayOfYear);
	var firstWeekDaysCount = 6 - firstDayOfYear.getDay();
	var months = [];
	for(var i = 0; i < 12; i++) {
		months.push({
			label: MONTHS_NAME[i],
			weeks: []
		});
	}
	var firstSaturdayOfYear = dayIncrementer.clone().add('days', firstWeekDaysCount);
	months[MONTHS_INDEX.jan].weeks.push({
		initialDate: dayIncrementer.clone(),
		finalDate: firstSaturdayOfYear,
		showDate: firstSaturdayOfYear.format('DD')
	});
	var initialDate, finalDate, month;
	for( var i = firstWeekDaysCount + 1; i < 358; i+=7) {
		initialDate = dayIncrementer.clone().add("days", i);
		finalDate = dayIncrementer.clone().add("days", i + 6);

		month = finalDate.get('month');

		months[month].weeks.push({
			initialDate: initialDate,
			finalDate: finalDate,
			showDate: finalDate.format('DD')
		});
	}
	return months;
}

var processEventsDates = function(months, events)  {
	var week, event, month;
	for(var i = 0; i < events.length; i++){
		event = events[i];
		event.dateObject = moment(event.date, "DD/MM/YYYY");
		if(event.finalDate) {
			event.finalDateObject = moment(event.finalDate, "DD/MM/YYYY");
		}
		if(event.dateObject.year() < 2014) {
			week = event.finalDateObject.weeks();
			month = event.finalDateObject.month() * 4;
		} else {
			week = event.dateObject.weeks();
			month = event.dateObject.month() * 4;
		}
		console.log(week - month - 1);
	}
	return [];
}

distrito35Controllers.controller(
	'CalendarRegionCtrl', 
	['$scope', '$http',function($scope, $http) {
		setActiveLink('calendar-region');
		handlerFullSizeButton('#btnFullScreen');
		if(window.cache.calendarRegion === undefined) {
			$http.get('data/calendarRegional.json').success(
				function(eventsOfYear) {
					var months = getWeeksByMonth(2014);
					window.cache.calendarRegion = processEventsDates(months, eventsOfYear);
					$scope.calendar = window.cache.calendarRegion;
				}
			);
		} else {
			$scope.calendar = window.cache.calendarRegion;
		}
	}]
);