'use strict';
angular.module('softvFrostApp').controller('NuevaTerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory,$uibModal) {
	this.$onInit = function() {
terminalFactory.getServicioList().then(function(data){
vm.Servicios=data.GetServicioListResult;

});
	}

	function BuscaSuscriptor(){
		alert('si');
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalBusquedaSuscriptor.html',
			controller: 'ModalBusquedaSuscriptorCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'

			// resolve: {
			// 	suscriptor: function() {
			// 		return object;
			// 	}
			// }
		});
	}


	var vm = this;
	vm.titulo = "Nueva Terminal";
	vm.BuscaSuscriptor=BuscaSuscriptor;
}
