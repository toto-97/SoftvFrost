'use strict';
angular.module('softvFrostApp')
	.factory('reportesFactory', function($http, $q, $window, globalService, $localStorage) {
		
		var factory = {};
		
		var paths = {  		
			mostrarReportePlanta: "/Reportes_Planta/GetReportes_PlantaList", //ok
			mostrarReporteTokens: "/Reporte_Tokens/GetReporte_TokensList",	//ok
			mostrarReporteMigraciones: "/Reporte_Migraciones/GetReporte_MigracionesList", //ok
			mostrarReporteMovimientos: "/Reporte_Movimientos/GetReporte_MovimientosList", //ok
			mostrarPlan: "/Reporte_DetalleTerminal/GetPlanByClienteBeam_reporte", //ok


			mostrarReporteDetTerminales: "/Reporte_DetalleTerminal/GetReporte_DetalleTerminalList",		
			//mostrarCliente: "/Reporte_DetalleTerminal/GetCliente",
			//mostrarBeam: "/Reporte_DetalleTerminal/GetBeam",			
			
			
		};






//--------------------------------------------


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
	}


	factory.mostrarReporteTokens = function(idAux, fechaInicioYMD, fechaFinYMD) {	
 
		var deferred = $q.defer();
			var Parametros = {
				"idAux": idAux,
				"fechaInicio": fechaInicioYMD,
				"fechaFin": fechaFinYMD
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
				"idAux": idAux,
				"fechaInicio": fechaInicioYMD,
				"fechaFin": fechaFinYMD
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
				"idAux": idAux,
				"fechaInicio": fechaInicioYMD,
				"fechaFin": fechaFinYMD
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


	factory.mostrarReporteDetTerminales = function(idAux, cliente, beam, plan, estado, noSerie, idSus, siteId) {			

			var deferred = $q.defer();
			var Parametros = {	
					'idAux': idAux,
			        'idCliente': cliente,
			        'idBeam': beam,
			        'idPlan': plan,
			        'status': estado, //nombre
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




/*
		factory.ObtenTecnicos = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ObtenTecnicos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		}; */













	factory.mostrarPlan = function(idCliente) {			

			var deferred = $q.defer();
			var Parametros = {
						'idCliente': idCliente
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.mostrarPlan, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;

	});
