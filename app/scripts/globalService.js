'use strict';
angular.module('softvFrostApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
		//	return 'http://52.26.45.49/SoftvWCFService.svc';
		return 'http://localhost:64481/SoftvWCFService.svc';
		//return 'http://52.88.118.163/SoftvWCFService.svc';
		};
		return svc;
	});
