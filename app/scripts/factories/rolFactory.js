'use strict';
angular.module('softvFrostApp')
	.factory('rolFactory', function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetRoleList: '/Role/GetRoleList',
			AddRole: '/Role/AddRole',
			UpdateRole: '/Role/UpdateRole',
		};

		factory.GetRoleList=function(){
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetRoleList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		}

		return factory;
  });
