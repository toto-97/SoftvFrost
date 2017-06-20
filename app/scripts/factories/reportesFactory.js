'use strict';
angular.module('softvFrostApp')
	.factory('reportesFactory', function($http, $q, $window, globalService, $localStorage) {
		
		var factory = {};		
		var paths = {  		
			mostrarReportePlanta: '/Reportes_Planta/GetReportes_PlantaList', 
			mostrarReporteTokens: '/Reporte_Tokens/GetReporte_TokensList',	
			mostrarReporteMigraciones: '/Reporte_Migraciones/GetReporte_MigracionesList', 
			mostrarReporteMovimientos: '/Reporte_Movimientos/GetReporte_MovimientosList', 
			mostrarPlan: '/Reporte_DetalleTerminal/GetPlanByBeam_reporte', 
			mostrarBeam: '/Reporte_DetalleTerminal/GetBeam_reporte',
			mostrarReporteDetTerminales: '/Reporte_DetalleTerminal/GetReporte_DetalleTerminalList',
			mostrarReporteConsumo: '/Reporte_Consumo/GetReporte_GeneralList',
			mostrarReportePorPlataforma: '/Reporte_Consumo/GetReporte_PorPlataforma',
			mostrarReporteDatosDelSuscriptor: '/Reporte_Consumo/GetReporte_DatosDelSuscriptor',
			mostrarReporteContrato: '/Reporte_Consumo/GetReporte_Contrato'
		};


	factory.mostrarReportePlanta=function(){
		var deferred = $q.defer();
		var config = {
			headers: {
				'Authorization': $localStorage.currentUser.token,
			}
		};
		$http.get(globalService.getUrl() + paths.mostrarReportePlanta, config).then(function(response) {
			deferred.resolve(response.data);
		}).catch(function(response) {
			deferred.reject(response);
		});
		return deferred.promise;
	};


	factory.mostrarReporteTokens = function(idAux, fechaInicioYMD, fechaFinYMD) {	
 
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux,
				'fechaInicio': fechaInicioYMD,
				'fechaFin': fechaFinYMD
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarReporteTokens, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};			


	factory.mostrarReporteMigraciones = function(idAux, fechaInicioYMD, fechaFinYMD) {	
 
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux,
				'fechaInicio': fechaInicioYMD,
				'fechaFin': fechaFinYMD
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarReporteMigraciones, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};	


	factory.mostrarReporteMovimientos = function(idAux, fechaInicioYMD, fechaFinYMD) {	
 
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux,
				'fechaInicio': fechaInicioYMD,
				'fechaFin': fechaFinYMD
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarReporteMovimientos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};	


	factory.mostrarReporteDetTerminales = function(idAux, beam, plan, estado, noSerie, idSus, siteId) {			

			var deferred = $q.defer();
			var Parametros = {	
					'idAux': idAux,
			     
			        'idBeam': beam,
			        'idPlan': plan,
			        'status': estado, 
			        'noSerie': noSerie,		
			        'idSuscriptor': idSus,
			        'siteId': siteId,				  
			};

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarReporteDetTerminales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};









	factory.mostrarPlan = function() {			

			var deferred = $q.defer();
			
						
		
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.mostrarPlan, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
	};



		factory.obtenerFechaHoy = function() {			
			var today = new Date();
			var dd = today.getDate();   
			var month ='';            

			if(dd<10) {
			    dd='0'+dd;
		} 
		        
		switch (new Date().getMonth()+1){
		    case 1:
		                month = 'enero'; break;
		            case 2:
		                month = 'febrero'; break;
		            case 3:
		                month = 'marzo';   break;
		            case 4:
		                month = 'abril';  break;
		            case 5:
		                month = 'mayo';   break;
		            case 6:
		                month = 'junio';  break;
		    		case 7:
		                month = 'julio';  break;
		            case 8:
		                month = 'agosto';  break;
		            case 9:
		                month = 'septiembre';  break;
		            case 10:
		                month = 'octubre';   break;
		            case 11:
		                month = 'noviembre';   break;
		            case 12:
		                month = 'diciembre';    break;
			} 
			today = dd+' de '+month+' de '+today.getFullYear();
			return today;
		};
		
	
		factory.mostrarBeam = function() {		
			var deferred = $q.defer();									
			
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.mostrarBeam, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};


	factory.mostrarReporteConsumo = function(idAux, fechaInicioYMD) {	
   
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux,
				'fechaActivacion': fechaInicioYMD
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			$http.post(globalService.getUrl() + paths.mostrarReporteConsumo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};	

	factory.mostrarReportePorPlataforma = function(idAux) {	
   
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			$http.post(globalService.getUrl() + paths.mostrarReportePorPlataforma, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};	


		factory.mostrarReporteDatosDelSuscriptor = function(idAux) {	   
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			$http.post(globalService.getUrl() + paths.mostrarReporteDatosDelSuscriptor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};	
	
		factory.mostrarReporteContrato = function(idAux) {	   
		var deferred = $q.defer();
			var Parametros = {
				'idAux': idAux
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			$http.post(globalService.getUrl() + paths.mostrarReporteContrato, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};	
		
		return factory;

	});