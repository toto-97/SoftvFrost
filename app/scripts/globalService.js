'use strict';
angular.module('softvFrostApp')
	.service('globalService', function () {
		var svc = {};

		svc.getUrl = function() {
			return 'http://localhost:64481/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
			return 'http://189.254.231.37:9092/SoftvFrostAPI';
		};

		svc.getUrlBeams = function () {
			return 'http://189.254.231.37:9090/beams/';
		};

		svc.getUrlHughesMonitoreo = function () {
			return 'http://189.254.231.37:9090/api';
		};

		return svc;
	});
