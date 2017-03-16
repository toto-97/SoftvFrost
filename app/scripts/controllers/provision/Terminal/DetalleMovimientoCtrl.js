'use stric';
angular.module('softvFrostApp').controller('DetalleMovimientoCtrl',DetalleMovimientoCtrl);

function DetalleMovimientoCtrl($uibModalInstance,movimiento, terminalFactory) {
    var vm = this;
    vm.cancel = cancel;

    this.$onInit = function () {
        terminalFactory.detalleMovimiento(movimiento.IdMovimiento).then(function(data) {
            vm.movimiento = data.GetDeepMovimientoResult;
        });
    }

    function cancel(){
        $uibModalInstance.dismiss('cancel');
    }
}