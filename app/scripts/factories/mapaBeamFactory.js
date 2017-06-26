'use strict';
angular.module('softvFrostApp')
  .factory('mapaBeamFactory', function ($http, $q, $window, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetBeamList: '/Terminal/GetBeamList',
      GetBeamUsage: '/Beam/GetBeamUsage',
      GetTerminalStatus:'/Terminal/GetStatus'

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


    factory.GetTerminalStatus = function (san) {
      var deferred = $q.defer();
      var parametros = {		
        'command': '',
        'BeamId': 0,
        'token': san	  
      };
      $http.post(globalService.getUrlHughesMonitoreo() + paths.GetTerminalStatus,JSON.stringify(parametros)).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };


    factory.GetBeamUsage = function (command, beamid) {
      var deferred = $q.defer();
      var parametros = {		
        'command': command,
        'BeamId': beamid,
        'token': ''		  
      };
      $http.post(globalService.getUrlHughesMonitoreo() + paths.GetBeamUsage,JSON.stringify(parametros)).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };

    return factory;

  });
