'use strict';
angular.module('softvFrostApp')
	.service('globalService', function () {
		var svc = {};

		svc.getUrl = function() {
<<<<<<< HEAD
			//return 'http://192.168.50.33:3000/SoftvWCFService.svc';
			return 'http://189.254.231.35:9091/SoftvWCFService.svc';
=======
			 	return 'http://localhost:64481/SoftvWCFService.svc';
			//return 'http://189.254.231.35:9091/SoftvWCFService.svc';
			
>>>>>>> develop
		};
		svc.getUrlHughesService = function () {
			// 	return 'http://35.164.143.107:8081/SoftvFrostAPI';
			return 'http://189.254.231.35:9092/SoftvFrostAPI';
				
		};

		svc.getUrlBeams = function () {
<<<<<<< HEAD
			//return 'http://189.254.231.35/beams/';
			return 'http://189.254.231.35/beams/';
=======
			// 	return 'http://35.164.143.107:8050/beams/';
			return 'http://189.254.231.35/beams/';
			
>>>>>>> develop
		};

		svc.getUrlHughesMonitoreo = function () {
				// 	return 'http://35.164.143.107:8050/api';
			return 'http://192.168.50.33:3000/BossMonitoreo/api';
				
		};

		return svc;
	});


