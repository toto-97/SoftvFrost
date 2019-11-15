'user strict';
angular
	.module('softvFrostApp')
	.controller('ModalReportesCtrl', function($uibModal, $uibModalInstance, cajasFactory, contrato) {

		/// Obtiene la lista de clientes y srvicios desde el factory
		function initialData() {
			cajasFactory.dameServiciosCliente().then(function(data) {
				vm.serviciosCliente = data.GetMuestraTipSerPrincipalListResult;
				vm.selectServicio = data.GetMuestraTipSerPrincipalListResult[0];
				getReportes();
			});
		}

		/// Obtiene el historial de quejas
		function getReportes() {
			cajasFactory.dameHistorialQuejas(contrato, vm.selectStatus, vm.selectServicio.Clv_TipSerPrincipal).then(function(data) {
				if (data.GetBuscaQuejasLListResult.length == 0) {
					vm.sinDatos = true;
					vm.reportes = '';
				} else {
					vm.sinDatos = false;
					vm.reportes = data.GetBuscaQuejasLListResult;
				}
			});
		}

		/// Muestra las queja 
		function singleQueja(clave) {
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/modalSingleQueja.html',
				controller: 'ModalSingleQuejaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				windowClass: 'app-modal-window',
				resolve: {
					clave: function() {
						return clave;
					}
				}
			});
		}

		/// Cancela la operacion
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initialData();
		vm.selectStatus = 'P';
		vm.singleQueja = singleQueja;
		vm.changeSelect = getReportes;

	});
