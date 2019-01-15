'use strict';
angular.module('softvFrostApp')
    .factory('catalogosMemoriaFactory', function ($http, $q, $window, globalService, $localStorage) {
        var factory = {};
        var paths = {
            GetGuardaTipoImagen: '/CatalogosMemoriaTecnica/GetGuardaTipoImagen',
            GetObtieneTipoImagenesCatalogo: '/CatalogosMemoriaTecnica/GetObtieneTipoImagenesCatalogo',
            GetEliminaTipoImagen: '/CatalogosMemoriaTecnica/GetEliminaTipoImagen',
            GetGuardaAntenas: '/CatalogosMemoriaTecnica/GetGuardaAntenas',
            GetObtieneAntenasCatalogo: '/CatalogosMemoriaTecnica/GetObtieneAntenasCatalogo',
            GetEliminaAntena: '/CatalogosMemoriaTecnica/GetEliminaAntena',
            GetObtieneManuales: '/CatalogosMemoriaTecnica/GetObtieneManuales',
            GetGuardaManuales: '/GuardaImagenesMemoriaTecnica/GetGuardaManuales2'
        };

        factory.GetGuardaManuales = function (file, Manuales, options, eliminadas) {
            var deferred = $q.defer();
            var data = new FormData();
            for (var i = 0; i < file.length; i++) {
                data.append('file' + i, file[i]);
            }
            data.append('Manuales', JSON.stringify(Manuales));
            data.append('options', JSON.stringify(options));
            data.append('eliminadas', JSON.stringify(eliminadas));

            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token,
                    'Content-Type': undefined
                }
            };
            //console.log(data);
            //console.log(config);
            $http.post(globalService.getUrlmemoriatecnica() + paths.GetGuardaManuales, data, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        factory.GetObtieneManuales = function () {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.get(globalService.getUrl() + paths.GetObtieneManuales, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        factory.GetEliminaAntena = function (parametros) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetEliminaAntena, JSON.stringify(parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        factory.GetObtieneAntenasCatalogo = function () {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.get(globalService.getUrl() + paths.GetObtieneAntenasCatalogo, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        factory.GetGuardaAntenas = function (parametros) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetGuardaAntenas, JSON.stringify(parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        factory.GetGuardaTipoImagen = function (parametros) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetGuardaTipoImagen, JSON.stringify(parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        factory.GetObtieneTipoImagenesCatalogo = function () {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.get(globalService.getUrl() + paths.GetObtieneTipoImagenesCatalogo, config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        factory.GetEliminaTipoImagen = function (parametros) {
            var deferred = $q.defer();
            var config = {
                headers: {
                    'Authorization': $localStorage.currentUser.token
                }
            };
            $http.post(globalService.getUrl() + paths.GetEliminaTipoImagen, JSON.stringify(parametros), config).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (data) {
                deferred.reject(data);
            });
            return deferred.promise;
        };

        return factory;

    });
