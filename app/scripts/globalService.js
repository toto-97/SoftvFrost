'use strict';
angular.module('softvFrostApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://189.254.231.35:9091/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
		    //return 'http://189.254.231.35:9092/SoftvFrostAPI';
		    return 'http://localhost:21590//SoftvFrostAPI';
		};

		return svc;
	});
