'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalFiltrarListaCtrl', function ($uibModalInstance, Lista, Titulo) {
        this.$onInit = function () {
            vm.ListaTodos = Lista;
            vm.ListaFiltro = Lista;
            vm.Titulo = Titulo;
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function searchCode(query) {
            vm.ListaFiltro = [];
            vm.ListaTodos.forEach(function (item) {
                if(item.Descripcion.includes(query)){
                    vm.ListaFiltro.push(item);
                }
            });
        }

        function ok() {
            $uibModalInstance.dismiss('cancel');
        }

        function seleccionar(item) {
            $uibModalInstance.close(item);
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        vm.searchCode = searchCode;
        vm.seleccionar = seleccionar;
    });
