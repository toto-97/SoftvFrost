'use strict';
angular.module('softvFrostApp')
	.factory('authFactory', function($http, $q, globalService, $base64) {
		var factory = {};
		var paths = {
			login: '/Usuario/LogOn'
		};

		factory.login = function(user, password) {
			var token = $base64.encode(user + ':' + password);
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': "Basic " + token
				}
			};
			console.log(config);
			$http.post(globalService.getUrl() + paths.login, JSON.stringify(Parametros), config)
				.then(function(response) {
					deferred.resolve(response);
				})
				.catch(function(response) {
					deferred.reject(response);
				});
			return deferred.promise;
		};

		return factory;
	});
