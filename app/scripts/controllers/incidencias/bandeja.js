'use strict';

function BandejaCtrl($uibModal) {
	function initial() {
		
	}

	function verDetalle() {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/incidencias/modalDetalleTicket.html',
			controller: 'DetalleTicketCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}

	var vm = this;
	vm.verDetalle = verDetalle;
}

angular.module('softvFrostApp').controller('BandejaCtrl', BandejaCtrl);
