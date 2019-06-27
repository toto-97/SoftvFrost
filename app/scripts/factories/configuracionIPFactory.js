'use strict';
angular.module('softvFrostApp')
  .factory('configuracionIPFactory', function ($http, $q, $window, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetBeamList: '/Terminal/GetBeamList',
      getServicioList: '/Servicio/GetServicioList',
      getPoolsIP: '/MuestraPoolsIP/GetMuestraPoolsIPList',
      guardaPool: '/GuardaPool/GetGuardaPoolList',
      obtieneDatosPool: '/ObtieneDatosPool/GetObtieneDatosPoolList',
      obtieneIPsPool: '/ObtieneIPsPool/GetObtieneIPsPoolList',
      eliminaPoolIP: '/EliminaPoolIP/GetEliminaPoolIPList',
      posiblesPool: '/PoolsPosiblesSAN/GetPoolsPosiblesSANList',
      IPActualSAN: '/IPActualSAN/GetIPActualSANList',
      GetObtieneServiciosPoolIP: '/ObtieneDatosPool/GetObtieneServiciosPoolIP',
      GetEditaPool: '/GuardaPool/GetEditaPool',
    };

    factory.GetEditaPool = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.GetEditaPool, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.GetObtieneServiciosPoolIP = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.GetObtieneServiciosPoolIP, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };


    factory.GetBeamList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetBeamList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
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

    factory.getPoolsIP = function() {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.get(globalService.getUrl() + paths.getPoolsIP, config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.guardaPool = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.guardaPool, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.obtieneDatosPool = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.obtieneDatosPool, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.obtieneIPsPool = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.obtieneIPsPool, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.eliminaPoolIP = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.eliminaPoolIP, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.posiblesPool = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.posiblesPool, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    factory.IPActualSAN = function(parametros) {
        var deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': $localStorage.currentUser.token
            }
        };
        $http.post(globalService.getUrl() + paths.IPActualSAN, JSON.stringify(parametros), config).then(function(response) {
            deferred.resolve(response.data);
        }).catch(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };

    return factory;

  });
