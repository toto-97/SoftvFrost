'use strict';
angular.module('softvFrostApp').controller('TerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory, $uibModal, $state, nuevoSuscriptorFactory) {
	this.$onInit = function() {
		terminalFactory.getTerminalList().then(function(data) {
			console.log(data);
			vm.terminales = data.GetTerminalListResult;
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

	function GestionTerminal(object) {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalGestionTerminal.html',
			controller: 'ModalGestionTerminalCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',
			resolve: {
				terminal: function() {
					return object;
				}
			}
		});

	}

	function EditarTerminal(obj) {
		$state.go('home.provision.terminalesEdita', {
			'Id': obj.SAN
		});
	}

	var vm = this;
	vm.GestionTerminal = GestionTerminal;
	vm.EditarTerminal = EditarTerminal;
	vm.titulo = "Terminales";
}
