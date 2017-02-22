'use strict';
angular.module('softvFrostApp').controller('SuscriptorCtrl', SuscriptorCtrl);

function SuscriptorCtrl(SuscriptorFactory,$uibModal) {

	function Init() {
		
		SuscriptorFactory.getSuscriptorList().then(function(data) {
			vm.suscriptores=data.GetSuscriptorListResult;
		});
	}

	function DetalleSuscriptor(object) {
		
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/provision/ModalDetalleSuscriptor.html',
				controller: 'ModalDetalleSuscriptorCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				windowClass: 'app-modal-window',
				resolve: {
					suscriptor: function() {
						return object;
					}
				}
			});	

	}

	function DetalleTerminales() {
		alert('terminales');
	}

	function DetalleMovimientos() {
		alert('Movimientos');
	}


	var vm = this;
	Init();
	vm.DetalleSuscriptor = DetalleSuscriptor;
	vm.DetalleTerminales = DetalleTerminales;
	vm.DetalleMovimientos = DetalleMovimientos;
	vm.hola = 'adsasdas';
}
