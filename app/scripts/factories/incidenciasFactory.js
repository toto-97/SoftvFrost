'use strict';
angular.module('softvFrostApp')
	.factory('incidenciasFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addTicket: '/Ticket/AddTicket',
			getTickets: 'Ticket/GetTicketList',
			getTerminal: '/Terminal/GetByTerminal'
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
                        "Sintoma": obj.sintoma,
                        "Prioridad": obj.prioridad,
                        "Descripcion": obj.descripcion,
						"IdTipoContacto":1,
						"NombreContacto": obj.nombreContrato,
						"IdMedioComunicacion":1,
						"NumeroContacto": obj.numeroContrato
                    }
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addTicket, JSON.stringify(Parametros), config).then(function(response) {

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

			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.updateTicket = function() {
			var deferred = $q.defer();
			var Parametros = {
                "objTicket":
                    {
                        "IdUsuario": $localStorage.currentUser.idUsuario,
                        "IdTicketPadre": 0,
                        "SAN": obj.san,
                        "Fecha": obj.fecha,
                        "Sintoma": "aaaa",
                        "Prioridad": "aaa",
                        "Descripcion": "aaaaaaaaaa"
                    }
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.updateTicket, JSON.stringify(Parametros), config).then(function(response) {

			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		factory.getTerminal = function(terminal) {
			var deferred = $q.defer();
			var Parametros = {
				  "SAN": terminal
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getTerminal, JSON.stringify(Parametros), config).then(function(response) {

			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		return factory;
	});
