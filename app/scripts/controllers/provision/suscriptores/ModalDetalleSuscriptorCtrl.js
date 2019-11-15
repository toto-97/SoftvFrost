'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalDetalleSuscriptorCtrl', function($uibModalInstance, $uibModal, suscriptor, SuscriptorFactory, $rootScope, ngNotify) {
		
		/// Obtiene las terminales
		this.$onInit = function() {
			SuscriptorFactory.getTerminals(suscriptor.IdSuscriptor).then(function(data) {
				vm.terminales = data.GetDeepIdSuscriptorResult;
			});
		}

		/// Cancela la operacion
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.suscriptor = suscriptor;

	})
