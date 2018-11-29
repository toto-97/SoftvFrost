'use strict';
angular.module('softvFrostApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl(authFactory, ngNotify, $state, $localStorage, $stateParams, $window, $location) {
	var vm = this;
	vm.login = login;
	vm.Prueba = Prueba;
	vm.DesactivaOVT = false;

	this.$onInit = function () {
		if($stateParams.ESN != undefined && $stateParams.ESN != '' && $stateParams.antenna_size != undefined && $stateParams.antenna_size != ''){
			$window.open('http://189.254.231.35/ovttool/#!/home/monitoreo/validation?esn=' + $stateParams.ESN + '&antenna_size=' + $stateParams.antenna_size, '_self');
		}
		if ($localStorage.currentUser) {
			if ($stateParams.ESN != undefined) {
				$state.go('home.provision.activacion', {
					'ESN': $stateParams.ESN
				});
			} else {
				$state.go('home.dashboard');
			}
		}
	}

	function login() {
		authFactory.login(vm.user, vm.password).then(function (data) {
			if (data) {
				$window.location.reload();
			} else {
				ngNotify.set('Datos de acceso erróneos', 'error');
			}
		});
	}

	function Prueba() {
		if ($stateParams.ESN != undefined && $stateParams.ESN != '') {
			$window.open('http://189.254.231.35/ovttool/#!/home/monitoreo/validation?esn=' + $stateParams.ESN, '_blank');
		}
	}
}
