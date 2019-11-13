'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalPreguntaFolioCtrl', function ($uibModalInstance) {
        
        /// Cancela la operacion
        function cancel() {
            $uibModalInstance.close(false);
        }

        /// Verifica el folio ingresado
        function aceptar() {
            $uibModalInstance.close(true);
        }

        var vm = this;
        vm.cancel = cancel;
        vm.aceptar = aceptar;
    });