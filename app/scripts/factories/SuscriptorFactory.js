'use strict';
angular.module('softvApp')
	.factory('SuscriptorFactory', function($http, $q, $window, globalService, $localStorage, PermPermissionStore, $location) {
		var factory = {};
		var paths = {
			getSuscriptorList: '/DameSessionW/GetDameSessionWList'
		};

		factory.getAuthentication = function(token) {
			var deferred = $q.defer();
			var Parametros = {
				'Id': 0,
				'Codigo': token
			};
			var config = {
				headers: {
					'Authorization': token
				}
			};
			$http.post(globalService.getUrl() + paths.getAuthentication, JSON.stringify(Parametros), config).then(function(response) {

			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};


		return factory;
	});
