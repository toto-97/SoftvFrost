'use strict';
angular
    .module('softvFrostApp')
    .controller('ModalNotaPestanaCtrl', function ($uibModalInstance, Pestana, IdMemoriaTecnica, notas_pestana, notas_pestana_ant, $localStorage, moment) {
        this.$onInit = function () {
            vm.notas_pestana = [];
            vm.notas_aux = [];
            vm.notas_pestana_ant = [];
            notas_pestana.forEach(function (item) {
                if (item.Pestana == Pestana) {
                    vm.notas_pestana.push(item);
                }
                else{
                    vm.notas_aux.push(item);
                }
            });
            notas_pestana_ant.forEach(function (item) {
                if (item.Pestana == Pestana) {
                    vm.notas_pestana_ant.push(item);
                }
            });
            //vm.notas_pestana_ant = notas_pestana_ant;
            vm.Pestana = Pestana;
            vm.IdMemoriaTecnica = IdMemoriaTecnica;
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            vm.notas_pestana.forEach(function (item) {
                vm.notas_aux.push(item);
            });
            $uibModalInstance.close(vm.notas_aux);
        }

        function eliminaNota(index) {
            if (index > -1) {
                vm.notas_pestana.splice(index, 1);
            }
        }

        function guardaNota() {
            var obj = {};
            obj.Observacion = vm.detallenota;
            obj.IdUsuario = $localStorage.currentUser.idUsuario;
            obj.IdObservacion = 0;
            obj.Fecha = moment().format('L');
            obj.Nombre = $localStorage.currentUser.nombre;
            obj.Pestana = Pestana;
            vm.notas_pestana.push(obj);
            vm.detallenota = '';
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        //vm.seleccionar = seleccionar;
        vm.eliminaNota = eliminaNota;
        vm.guardaNota = guardaNota;
    });
