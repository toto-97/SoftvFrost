'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalDetalleSuscriptorCtrl', function($uibModalInstance, $uibModal, suscriptor, SuscriptorFactory, $rootScope, ngNotify) {
<<<<<<< HEAD

		function initialData() {
			vm.suscriptor = suscriptor;
		}

		function ok() {}

=======
>>>>>>> develop
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}



		var vm = this;
		vm.cancel = cancel;
<<<<<<< HEAD
		vm.ok = ok;
		initialData();

=======
		vm.suscriptor = suscriptor;
>>>>>>> develop
	})
