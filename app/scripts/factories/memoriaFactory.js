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
      GuardaEquiposSustituir: '/GuardaEquiposSustituir/GetGuardaEquiposSustituirList'
    };

    factory.GuardaImagenesMemoriaTecnica = function (file) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        //console.log(file[i].file);
        data.append('file' + i, file[i]);
      }



     // data.append('usuario', $localStorage.currentUser.usuariosac);
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



    factory.GuardaEquiposSustituir = function (object) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': object.IdMemoriaTecnica,
        'Equipo': object.Equipo,
        'SerieAnterior': object.SerieAnterior,
        'SerieNueva': object.SerieNueva

      };
      $http.post(globalService.getUrl() + paths.GuardaEquiposSustituir, JSON.stringify(Parametros), config).then(function (response) {
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
