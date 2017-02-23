'use strict';
angular.module('softvFrostApp')
	.factory('terminalFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getTerminalList: '/Terminal/GetTerminalList',
			getServicioList: '/Servicio/GetServicioList'

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
