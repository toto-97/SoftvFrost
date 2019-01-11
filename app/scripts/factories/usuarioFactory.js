'use strict';
angular.module('softvFrostApp')
	.factory('usuarioFactory', function ($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getUsuarioList: '/Usuario/GetUsuarioList',
			GetUserDetail: '/Usuario/GetUserListbyIdUser',
			AddUsuario: '/Usuario/AddUsuario',
			UpdateUsuario: '/Usuario/UpdateUsuario',
			BuscaUsuario: '/Usuario/GetUsuario2List',
			existeUsuario: '/Usuario/GetExisteUser',
			GetDistribuidores: '/Usuario/GetDistribuidores',
			GetPlazas:'/Usuario/GetPlazas',
			GetObtieneTecnicosUsuario:'/Usuario/GetObtieneTecnicosUsuario',
			GetObtieneTecnicosLibres:'/Usuario/GetObtieneTecnicosLibres',
			GetGuardaRelacionUsuarioTecnico:'/Usuario/GetGuardaRelacionUsuarioTecnico',
			GetObtieneCompaniasUsuario:'/Usuario/GetObtieneCompaniasUsuario',
			GetObtieneCompaniasLibres:'/Usuario/GetObtieneCompaniasLibres',
			GetGuardaRelacionUsuarioCompania:'/Usuario/GetGuardaRelacionUsuarioCompania'
		};
		
		factory.GetGuardaRelacionUsuarioCompania = function (IdUsuario,companias) {
			var deferred = $q.defer();
			var Parametros = {
				'IdUsuario':IdUsuario, 
				 'companias':companias							
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetGuardaRelacionUsuarioCompania, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};


		factory.GetObtieneCompaniasLibres = function (IdUsuario,Clv_Plaza) {
			var deferred = $q.defer();
			var Parametros = {
				'IdUsuario':IdUsuario, 
				 'Clv_Plaza':Clv_Plaza							
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetObtieneCompaniasLibres, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};


		factory.GetObtieneCompaniasUsuario = function (clave) {
			var deferred = $q.defer();
			var Parametros = {
				'clave': clave								
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetObtieneCompaniasUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};



		factory.GetGuardaRelacionUsuarioTecnico = function (IdUsuario,tecnicos) {
			var deferred = $q.defer();
			var Parametros = {
				'IdUsuario': IdUsuario,
				'tecnicos':tecnicos				
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetGuardaRelacionUsuarioTecnico, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetObtieneTecnicosLibres = function (IdUsuario,IdCompania,Clv_Plaza) {
			var deferred = $q.defer();
			var Parametros = {
				'IdUsuario': IdUsuario,
				'IdCompania':IdCompania,
				'Clv_Plaza':Clv_Plaza
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetObtieneTecnicosLibres, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};



		factory.GetObtieneTecnicosUsuario = function (clave) {
			var deferred = $q.defer();
			var Parametros = {
				'clave': clave		
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetObtieneTecnicosUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};


		factory.GetPlazas = function (clave) {
			var deferred = $q.defer();
			var Parametros = {
				'clave': clave		
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetPlazas, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};


		
		factory.GetDistribuidores = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetDistribuidores, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.existeUsuario = function (usuario) {
			var deferred = $q.defer();
			var Parametros = {
				'Usuario2': usuario,
				'Op':0
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.existeUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getUsuarioList = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getUsuarioList, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetUserDetail = function (id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdUsuario': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetUserDetail, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.AddUsuario = function (object) {
			var deferred = $q.defer();
			var Parametros = {

				'objUsuario': {
					'IdRol': object.IdRol,
					'Nombre': object.Nombre,
					'Email': object.Email,
					'Usuario': object.Usuario,
					'Password': object.Password,
					'RecibeMensaje':object.RecibeMensaje,
					'CheckMemoria':object.CheckMemoria,
					'Cliente':object.Cliente,
					'Estado':object.Estado,
					'LUITerminal':object.LUITerminal
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.AddUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};
		factory.UpdateUsuario = function (object) {
			var deferred = $q.defer();
			var Parametros = {

				'objUsuario': {
					'IdUsuario': object.IdUsuario,
					'IdRol': object.IdRol,
					'Nombre': object.Nombre,
					'Email': object.Email,
					'Usuario': object.Usuario,
					'Password': object.Password,
					'RecibeMensaje':object.RecibeMensaje,
					'CheckMemoria':object.CheckMemoria,
					'Cliente':object.Cliente,
					'Estado':object.Estado,
					'LUITerminal':object.LUITerminal
				}
			};
			//console.log('objeto enviado',Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.UpdateUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.BuscaUsuario = function (obj) {
			var deferred = $q.defer();
			var Parametros = {
				'Nombre': obj.Nombre,
				'Email': obj.Email,
				'Usuario2': obj.Usuario2,
				'Op': obj.Op,
				'IdRol': obj.IdRol
			};
			//console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.BuscaUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		return factory;
	});
