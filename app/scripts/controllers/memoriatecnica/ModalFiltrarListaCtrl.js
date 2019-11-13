'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalFiltrarListaCtrl', function ($uibModalInstance, Lista, Titulo) {

        /// Obtiene los filtros para mostar la informacion
        this.$onInit = function () {
            vm.ListaTodos = Lista;
            vm.ListaFiltro = Lista;
            vm.Titulo = Titulo;
        }

        /// Cancela la consulta
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        /// Determina el tipo de busqueda que se realizara
        function searchCode(query) {
            vm.ListaFiltro = [];
            if (Titulo == 'Instalador') {
                vm.ListaTodos.forEach(function (item) {
                    var desAux = item.Descripcion.toLowerCase();
                    if (desAux.includes(query.toLowerCase())) {
                        vm.ListaFiltro.push(item);
                    }
                });
            }
            else {
                vm.ListaTodos.forEach(function (item) {
                    if (item.Descripcion.includes(query)) {
                        vm.ListaFiltro.push(item);
                    }
                });
            }
        }

        /// Cancela la operacion
        function ok() {
            $uibModalInstance.dismiss('cancel');
        }

        /// Selecciona un filtro del html
        function seleccionar(item) {
            $uibModalInstance.close(item);
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        vm.searchCode = searchCode;
        vm.seleccionar = seleccionar;
    });
