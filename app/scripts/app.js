'use strict';

/**
 * @ngdoc overview
 * @name softvFrostApp
 * @description
 * # softvFrostApp
 *
 * Main module of the application.
 */
angular.module('softvFrostApp', [
		'ngAnimate',
		'ngSanitize',
		'ui.router'
	])
	.config(['$provide', '$urlRouterProvider', '$httpProvider', '$qProvider', function($provide, $urlRouterProvider, $httpProvider, $qProvider) {
		$urlRouterProvider.otherwise('/auth/login');
		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			function notifyError(rejection) {
				console.log(rejection);
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					sessionStorage.clear();
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}])
	.constant('APP_CONFIG', window.appConfig)
	.run(['$rootScope', '$state', '$stateParams', '$location', function($rootScope, $state, $stateParams, $location) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}]);
