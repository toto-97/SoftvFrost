'use strict';
angular.module('softvFrostApp')
	.factory('usuarioFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getUsuarioList: '/Usuario/GetUsuarioList',
			AddUsuario: '/Usuario/AddUsuario',
			UpdateUsuario: '/Usuario/UpdateUsuario',
		};

		factory.getUsuarioList=function(){
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getUsuarioList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		return factory;
  });
