'use strict';

function SuscriptorCtrl(SuscriptorFactory, $uibModal, $state, nuevoSuscriptorFactory) {

	this.$onInit = function() {
		SuscriptorFactory.getSuscriptorList().then(function(data) {
			vm.suscriptores = data.GetSuscriptorListResult;
		});
		nuevoSuscriptorFactory.getEstados().then(function(data) {
			data.GetEstadoListResult.unshift({
				'Nombre': '----------------',
				'IdEstado': 0
			});
			vm.estados = data.GetEstadoListResult;
			vm.estado = vm.estados[0];
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
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				suscriptor: function() {
					return object;
				}
			}
		});
	}

	function DetalleTerminales(suscriptor) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/terminalesSuscriptor.html',
			controller: 'terminaleseSuscriptorCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				suscriptor: function() {
					return suscriptor;
				}
			}
		});
	}

	function DetalleMovimientos() {
		alert('Movimientos');
	}

	function editarSuscriptor(item) {
		$state.go('home.provision.suscriptoresEditar', {
			params: {
				suscriptor: item
			}
		});
	}


	var vm = this;
	vm.DetalleSuscriptor = DetalleSuscriptor;
	vm.DetalleTerminales = DetalleTerminales;
	vm.DetalleMovimientos = DetalleMovimientos;
	vm.editarSuscriptor = editarSuscriptor;
}
angular.module('softvFrostApp').controller('SuscriptorCtrl', SuscriptorCtrl);
