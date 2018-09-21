'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalMemoriaDetalladoCtrl', function ($uibModalInstance, IdMemoriaTecnica, memoriaFactory) {
        
        function init() {
            vm.IdMemoriaTecnica = IdMemoriaTecnica;
            console.log("asdads");
            memoriaFactory.GetObtieneObservacionesMemoriaTecnica(IdMemoriaTecnica).then(function (result) {
                console.log('result',result);
                vm.rowCollection = result.GetObtieneObservacionesMemoriaTecnicaResult;
                /*notas.forEach(function (item) {
                    var obj = {};
                    obj.Observacion = item.Observacion;
                    obj.IdUsuario = 0;
                    obj.IdObservacion = 0;
                    obj.Fecha = item.Fecha;
                    obj.Nombre = item.Nombre;
                    vm.notas_ant.push(obj);
                });
                vm.rowCollection = notas_ant;*/
                memoriaFactory.GetObtieneObservacionesMemoriaTecnicaPestana(IdMemoriaTecnica).then(function (result) {
                    vm.rowCollection2 = result.GetObtieneObservacionesMemoriaTecnicaPestanaResult;
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
