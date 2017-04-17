'use strict';
angular.module('softvFrostApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://localhost:64481/SoftvWCFService.svc';
		};
		svc.getUrlHughesService = function() {
			return 'http://192.168.50.20:5000/api';
		};

		svc.getUrlBeams=function(){
			return 'http://35.164.143.107:8050/beams/'
		}
		

		return svc;
	});
