'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalEliminaQuejaCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, detalle, quejasFactory) {
		this.$onInit = function() {
			vm.Clv_Queja = detalle.Clv_Queja;
			console.log(vm.Clv_Queja);
		}

		/// Varifica si se puede eliminar la queja
		function Eliminar() {
			quejasFactory.EliminaQueja(vm.Clv_Queja).then(function(data) {
				var response = data.GetDeepuspBorraQuejasOrdenesResult;
				if (response.bndDescarga == true) {
					ngNotify.set('No se puede eliminar el Reporte ya que tiene Descarga de Material Asignada', 'error');
				} else if (response.bndOrdenQueja == true) {
					ngNotify.set('No se pueden eliminar Reportes con status Ejecutada', 'error');
				} else {
					ngNotify.set('La orden ha sido eliminada correctamente', 'success');
					$state.reload('home.procesos.reportes');
					$uibModalInstance.dismiss('cancel');
				}
			});
		}

		/// Cierra el HTML de eliminar la queja
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.Eliminar = Eliminar

	});
