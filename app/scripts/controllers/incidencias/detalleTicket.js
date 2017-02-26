'use strict';

function DetalleTicketCtrl($uibModalInstance, $localStorage, ticket, incidenciasFactory) {
    function initial() {
        vm.fecha = new Date();
        vm.showFirstTab = function(){
            angular.element('[data-target="#tab1"]').tab('show');
        }
        incidenciasFactory.getTicketDetalle(ticket).then(function(data) {
			vm.detalleTicket = data.GetDeepTicketResult;
			console.log(vm.detalleTicket);
		});
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

	var vm = this;
    vm.cancel = cancel
    vm.usuario = $localStorage.currentUser.usuario;
    initial();
}

angular.module('softvFrostApp').controller('DetalleTicketCtrl', DetalleTicketCtrl);
