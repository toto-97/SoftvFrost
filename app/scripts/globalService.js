'use strict';
angular.module('softvFrostApp')
  .service('globalService', function () {
    var svc = {};
//rutas servidor producción
   svc.getUrl = function() {
    	return 'http://189.254.231.35:9091/SoftvWCFService.svc';
    	
    	
    };
    svc.getUrlHughesService = function () {			
    	return 'http://189.254.231.35:9092/SoftvFrostAPI';				
    };

    svc.getUrlBeams = function () {			
    	return 'http://189.254.231.35/beams/';			
    };

    svc.getUrlHughesMonitoreo = function () {				
    	return 'http://189.254.231.35:9090/api';
    		
    };


//rutas locales
 /* svc.getUrl = function () {
      return 'http://192.168.50.33:3000/SoftvWCFService.svc';


    };
    svc.getUrlHughesService = function () {
      return 'http://192.168.50.33:3000/SoftvFrostAPI';
    };

    svc.getUrlBeams = function () {
      return 'http://189.254.231.35/beams/';
    };

    svc.getUrlHughesMonitoreo = function () {
      return 'http://192.168.50.33:3000/BossMonitoreo/api';

    };*/

    return svc;
  });
