'use strict';
angular.module('softvFrostApp')
	.service('globalService', function () {
		var svc = {};

		svc.getUrl = function() {
			//return 'http://192.168.50.33:3000/SoftvWCFService.svc';
			return 'http://189.254.231.35:9091/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
			//return 'http://192.168.50.33:3000/SoftvFrostAPI';
			return 'http://189.254.231.35:9092/SoftvFrostAPI';
		};

		svc.getUrlBeams = function () {
			//return 'http://189.254.231.35/beams/';
			return 'http://189.254.231.35/beams/';
		};

		svc.getUrlHughesMonitoreo = function () {
			//return 'http://192.168.50.33:3000/api';
			return 'http://189.254.231.35:9090/api';
		};

		return svc;
	});
