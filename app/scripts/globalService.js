'use strict';
angular.module('softvFrostApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://52.26.45.49/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function () {
		    //return 'http://52.26.45.49:8081/SoftvFrostAPI';
		    return 'http://localhost:21590/SoftvFrostAPI';
		};
		return svc;
	});
