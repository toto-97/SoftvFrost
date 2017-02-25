'use strict';
angular.module('softvFrostApp')
	.factory('incidenciasFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addTicket: '/Ticket/AddTicket',
			getTickets: '/Ticket/GetTicketList',
			getTerminal: '/Terminal/GetByTerminal',
			getMotivo: '/MotivoTicket/GetMotivoTicketList',
			getSintoma: '/Sintoma/GetSintomaList',
			getTipoContrato: '/TipoContacto/GetTipoContactoList',
			getMedio: '/MedioComunicacion/GetMedioComunicacionList'
		};
		factory.addTicket = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
                "objTicket":
                    {
                        "IdUsuario": $localStorage.currentUser.idUsuario,
                        "IdTicketPadre": 0,
                        "SAN": obj.san,
                        "Fecha": obj.fecha,
                        "IdSintoma": obj.sintoma,
                        "IdMotivoTicket": obj.motivo,
						"Prioridad": obj.prioridad,
                        "Descripcion": obj.descripcion,
						"IdTipoContacto":obj.tipoContacto,
						"NombreContacto": obj.nombreContrato,
						"IdMedioComunicacion":obj.medioComun,
						"NumeroContacto": obj.numeroContrato,
						"FechaCierre": "",
						"Estado": "P"
                    }
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addTicket, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getTickets = function(obj) {
			var deferred = $q.defer();
			var Parametros = {

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getTickets, JSON.stringify(), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getTerminal = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				  "SAN": san
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getTerminal, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getMotivo = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getMotivo, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getSintoma = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getSintoma, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getTipoContrato = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTipoContrato, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getMedio = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getMedio, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		return factory;
	});
