'use strict';
angular.module('softvFrostApp')
  .factory('permisoFactory', function($http, $q, $window, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetModuleList: '/Module/GetModuleList',
      GetPermisoList: '/Permiso/GetPermisoRolList',
    };
    factory.GetModuleList = function() {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetModuleList, config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    }


    factory.GetPermisoList = function(idrol) {
      var deferred = $q.defer();
      var Parametros = {
        'IdRol': idrol
      };

      console.log(Parametros);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetPermisoList, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    }
    return factory;

  });
