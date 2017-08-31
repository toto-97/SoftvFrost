'use strict';
angular
  .module('softvFrostApp')
  .factory('memoriaFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GuardaMemoriaTecnica: '/GuardaMemoriaTecnica/GetGuardaMemoriaTecnicaList',
      BuscaMemoriaTecnica: '/BuscaMemoriaTecnica/GetBuscaMemoriaTecnicaList',
      GuardaImagenesMemoriaTecnica: '/GuardaImagenesMemoriaTecnica/GetGuardaImagenesMemoriaTecnicaList',
      GuardaObservacionMemoriaTecnica: '/GuardaObservacionMemoriaTecnica/GetGuardaObservacionMemoriaTecnicaList',
      GuardaEquiposSustituir: '/GuardaEquiposSustituir/GetGuardaEquiposSustituirList',
      ObtieneTiposImagenes: '/ObtieneTiposImagenes/GetObtieneTiposImagenesList',
      GetObtieneImagenesMemoriaTecnica: '/GuardaImagenesMemoriaTecnica/GetObtieneImagenesMemoriaTecnica',
      GetObtieneMemoriaTecnica: '/GuardaMemoriaTecnica/GetObtieneMemoriaTecnica',
      UpdateGuardaMemoriaTecnica: '/GuardaMemoriaTecnica/UpdateGuardaMemoriaTecnica',
      GetObtieneEquiposSustituir: '/GuardaEquiposSustituir/GetObtieneEquiposSustituir'
    };

    factory.GuardaImagenesMemoriaTecnica = function (file, orden, options,eliminadas) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('orden', orden);
      data.append('options', JSON.stringify(options));
      data.append('eliminadas', JSON.stringify(eliminadas));

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      $http.post(globalService.getUrl() + paths.GuardaImagenesMemoriaTecnica, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };


    factory.GetObtieneEquiposSustituir = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneEquiposSustituir, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetObtieneMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetObtieneImagenesMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneImagenesMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GuardaEquiposSustituir = function (equipos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'equipos': equipos
      };
      $http.post(globalService.getUrl() + paths.GuardaEquiposSustituir, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.ObtieneTiposImagenes = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.ObtieneTiposImagenes, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };





    factory.UpdateGuardaMemoriaTecnica = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'objGuardaMemoriaTecnica': obj
      };
      $http.post(globalService.getUrl() + paths.UpdateGuardaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };




    factory.GuardaMemoriaTecnica = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = obj;
      $http.post(globalService.getUrl() + paths.GuardaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.BuscaMemoriaTecnica = function (object) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Folio': object.Folio,
        'Fecha': object.Fecha,
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'Clv_Orden': object.orden,
        'Op': object.op
      };
      $http.post(globalService.getUrl() + paths.BuscaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    return factory;
  });
