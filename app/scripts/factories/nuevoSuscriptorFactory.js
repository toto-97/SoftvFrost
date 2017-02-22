'use strict';
angular.module('softvFrostApp')
	.factory('nuevoSuscriptorFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			addSuscriptor: '/Suscriptor/AddSuscriptor'
		};
		factory.addSuscriptor = function(obj) {
			var deferred = $q.defer();
			var Parametros = {
				'objSuscriptor': {
					'IdEstado': 1,
					'Nombre': obj.nombre,
					'Apellido': obj.apellidos,
					'Telefono': obj.telefono,
					'Email': obj.email,
					'CP': obj.cp,
					'Calle': obj.calle,
					'Numero': obj.numero,
					'Colonia': obj.colonia,
					'Ciudad': obj.ciudad,
					'Referencia': obj.referencia,
					'FechaAlta': ''
				}

			};
			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addSuscriptor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		return factory;
	});
