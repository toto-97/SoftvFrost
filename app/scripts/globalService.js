'use strict';
angular.module('softvFrostApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://52.26.45.49/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
		    return 'http://192.168.50.102:8085/SoftvFrostAPI';
		    //return 'http://localhost:21590/SoftvFrostAPI';
		};

		return svc;
	});
