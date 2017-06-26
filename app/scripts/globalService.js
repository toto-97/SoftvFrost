'use strict';
angular.module('softvFrostApp')
	.service('globalService', function () {
		var svc = {};

		svc.getUrl = function() {
			return 'http://192.168.50.33:3000/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
			return 'http://192.168.50.33:3000/BossAPI/SoftvFrostAPI';
		};

		svc.getUrlBeams = function () {
			return 'http://189.254.231.35/beams/';
		};

		svc.getUrlHughesMonitoreo = function () {
			return 'http://192.168.50.33:3000/BossMonitoreo/api';
		};

		return svc;
	});
