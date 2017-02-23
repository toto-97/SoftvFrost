'use strict';
angular.module('softvFrostApp')
	.factory('incidenciasFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addTicket: '/Ticket/AddTicket',
		};
		factory.addTicket = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
                "objTicket":
                    {
                        "IdUsuario": $localStorage.currentUser.idUsuario,
                        "IdTicketPadre": 0,
                        "SAN": 1,
                        "Fecha": obj.fecha,
                        "Sintoma": obj.sintoma,
                        "Prioridad": obj.prioridad,
                        "Descripcion": obj.descripcion
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

		factory.updateTicket = function() {
			var deferred = $q.defer();
			var Parametros = {
                "objTicket":
                    {
						"IdTicket":2,
                        "IdUsuario": $localStorage.currentUser.idUsuario,
                        "IdTicketPadre": 0,
                        "SAN": 1,
                        "Fecha": "22/01/2017",
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

		return factory;
	});
