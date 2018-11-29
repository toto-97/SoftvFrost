'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalPreguntaFolioCtrl', function ($uibModalInstance) {
        
        function cancel() {
            $uibModalInstance.close(false);
        }


        function aceptar() {
            $uibModalInstance.close(true);
        }

        var vm = this;
        vm.cancel = cancel;
        vm.aceptar = aceptar;
    });