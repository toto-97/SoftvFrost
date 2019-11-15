'use strict';
angular
  .module('softvFrostApp')
  .controller('ModalAgendaQuejaCtrl', function ($uibModalInstance, ordenesFactory, $uibModal, $rootScope, atencionFactory, ngNotify, $localStorage, $state, options) {

    /// verifica la informacion ah extraer
    function initialData() {
      console.log(options);

      if (options.opcion == 1) {
        vm.muestraComboTurno = false;
        ordenesFactory.GetDameCitaOrdenQueja(options.clv_queja_orden, options.opcion).then(function (data) {
          vm.inputTurno = data.GetDameCitaOrdenQuejaResult.turno;
          vm.TecnicoAgenda = data.GetDameCitaOrdenQuejaResult.nombre;
          vm.FechaAgenda = data.GetDameCitaOrdenQuejaResult.fecha;
          vm.ComentarioAgenda = data.GetDameCitaOrdenQuejaResult.comentario;
        });

      } else {
        vm.muestraComboTurno = true;
        atencionFactory.ConsultaTurnos().then(function (data) {
          vm.Turnos = data.GetspConsultaTurnosListResult;
          vm.TecnicoAgenda = options.TecnicoAgenda;
          vm.FechaAgenda = options.FechaAgenda;
          vm.ComentarioAgenda = options.ComentarioAgenda;
          for (var a = 0; a < vm.Turnos.length; a++) {
            if (vm.Turnos[a].ID == options.TurnoAgenda) {
              vm.TurnoAgenda = vm.Turnos[a];
            }
          }
        });

      }


    }

    /// Acepta los cambios en la citas de las quejas
    function ok() {
      $uibModalInstance.dismiss('cancel');
    }

    /// Cierra el HTML
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();
  });
