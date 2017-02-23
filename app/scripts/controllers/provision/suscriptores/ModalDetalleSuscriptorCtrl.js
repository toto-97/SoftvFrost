'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalDetalleSuscriptorCtrl', function($uibModalInstance, $uibModal, suscriptor, SuscriptorFactory, $rootScope, ngNotify) {
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.suscriptor = suscriptor;
	})
