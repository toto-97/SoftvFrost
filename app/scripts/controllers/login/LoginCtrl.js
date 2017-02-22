'use strict';
angular.module('softvFrostApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl(authFactory) {
	function login() {
		console.log('asdfdsf');
		authFactory.login(vm.user, vm.password).then(function(data) {
			console.log(data);
		});
	}

	var vm = this;
	vm.login = login;
}
