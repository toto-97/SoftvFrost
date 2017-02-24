'use strict';

function DetalleTicketCtrl($uibModalInstance, $localStorage) {
    function initial() {
        vm.fecha = new Date();
        vm.showFirstTab = function(){
            angular.element('[data-target="#tab1"]').tab('show');
        }
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
