'use strict';
angular.module('softvFrostApp')
	.factory('terminalFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getTerminalList: '/Terminal/GetTerminalList',
			getServicioList: '/Servicio/GetServicioList',
			GuardaTerminal: '/Terminal/AddTerminal'

		};

		factory.GuardaTerminal = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdSuscriptor': objeto.IdSuscriptor,
				'IdServicio': objeto.IdServicio,
				"Latitud": '' + objeto.Latitud + '',
				"Longitud": '' + objeto.Longitud + '',
				"Estatus": objeto.Estatus,
				"FechaAlta": objeto.FechaAlta,
				"FechaSuspension": objeto.FechaSuspension,
				"ESN": objeto.ESN,
				"Comentarios": objeto.Comentarios
			}
			console.log(JSON.stringify({
				'objTerminal': parametros
			}));

			$http.post(globalService.getUrl() + paths.GuardaTerminal, JSON.stringify({
				'objTerminal': parametros
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTerminalList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTerminalList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getServicioList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getServicioList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;


	});
