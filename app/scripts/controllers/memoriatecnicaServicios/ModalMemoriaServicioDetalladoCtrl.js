'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalMemoriaServicioDetalladoCtrl', function ($uibModalInstance, IdMemoriaTecnica, memoriaServicioFactory) {
        function init() {
            vm.IdMemoriaTecnica = IdMemoriaTecnica;
            memoriaServicioFactory.GetObtieneObservacionesMemoriaTecnica(IdMemoriaTecnica).then(function (result) {
                vm.rowCollection = result.GetObtieneObservacionesMemoriaTecnicaServicioResult;
                memoriaServicioFactory.GetObtieneObservacionesMemoriaTecnicaPestana(IdMemoriaTecnica).then(function (result) {
                    vm.rowCollection2 = result.GetObtieneObservacionesMemoriaTecnicaPestanaServicioResult;
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }


        function ok() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        init();
    });
