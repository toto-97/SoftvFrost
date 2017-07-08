'use strict';
angular.module('softvFrostApp')
  .service('globalService', function () {
    var svc = {};
//rutas servidor producción
    /*svc.getUrl = function() {
    	return 'http://189.254.231.35:9091/SoftvWCFService.svc';
    	
    	
    };
    svc.getUrlHughesService = function () {			
    	return 'http://189.254.231.35:9092/SoftvFrostAPI';				
    };

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


//rutas locales
    svc.getUrl = function () {
      return 'http://192.168.50.33:3000/SoftvWCFService.svc';


    };
    svc.getUrlHughesService = function () {
      return 'http://192.168.50.33:3000/SoftvFrostAPI';
    };

    svc.getUrlBeams = function () {
      return 'http://189.254.231.35/beams/';
    };

    svc.getUrlHughesMonitoreo = function () {
      return 'http://192.168.50.33:3000/api';

    };

    return svc;
  });
