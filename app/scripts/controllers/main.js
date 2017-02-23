'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp')
	.controller('MainCtrl', function($localStorage, $window) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		this.$onInit = function() {
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.menu;
				vm.usuario = $localStorage.currentUser.usuario;
			} else {
				location.href === '/auth/login';
			}

		}

		function logOut() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}

		var vm = this;
		vm.logOut = logOut;
		vm.usuario = $localStorage.currentUser.usuario;
	});
