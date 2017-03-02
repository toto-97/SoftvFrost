'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalGestionTerminalCtrl', function($uibModalInstance, $uibModal, terminalFactory,terminal, $rootScope, ngNotify) {

		function initialData() {
		    vm.Terminal=terminal;
		    console.log(terminal);
		    terminalFactory.getComandoList().then(function(data) {
				vm.Comandos = data.GetComandoListResult;
				console.log(vm.Comandos[0]);
			});
		}

		function ok() {

		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();


	})
