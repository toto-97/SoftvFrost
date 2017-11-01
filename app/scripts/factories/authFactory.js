'use strict';
angular.module('softvFrostApp')
	.factory('authFactory', function($http, $q, globalService, $base64, $localStorage, $location, $window, ngNotify) {
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
					'Authorization': 'Basic ' + token
				}
			};
			$http.post(globalService.getUrl() + paths.login, JSON.stringify(Parametros), config)
				.then(function(response) {
					console.log(response);
					console.log(response.data.LogOnResult.Role.RecibeMensaje);
					if (response.data.LogOnResult.Token) {
						$localStorage.currentUser = {
							token: response.data.LogOnResult.Token,
							nombre: response.data.LogOnResult.Nombre,
							idRol: response.data.LogOnResult.IdRol,
							idUsuario: response.data.LogOnResult.IdUsuario,
							usuario: response.data.LogOnResult.Usuario,
							menu: response.data.LogOnResult.Menu,
							usuariosac:response.data.LogOnResult.UsuarioSAC,
							Recibemensaje:(response.data.LogOnResult.RecibeMensaje===null)?false:response.data.LogOnResult.RecibeMensaje,
							status:false
							//Recibemensaje:(response.data.LogOnResult.Recibemensaje==null)?false:response.data.LogOnResult.Recibemensaje
						};
						console.log($localStorage.currentUser);
						deferred.resolve(true);
					} else {
						deferred.resolve(false);
					}
				})
				.catch(function(response) {
					ngNotify.set('Autenticación inválida, credenciales no válidas.', 'error');
					deferred.reject(response.statusText);
				});
			return deferred.promise;
		};

		return factory;
	});
