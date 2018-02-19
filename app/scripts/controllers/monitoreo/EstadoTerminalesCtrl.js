'use strict';
angular

  .module('softvFrostApp')
  .controller('EstadoTerminalesCtrl', function ($filter, $uibModal, terminalFactory, mapaBeamFactory, $rootScope, ngNotify) {

    function initialData() {
      mapaBeamFactory.GetBeamList().then(function (result) {
       
        vm.Beams = result.GetBeamListResult;
        var objTodos = {
          BaseRemoteIp: null,
          BeamId: 0,
          FilePath: "",
          Name: "Todos"
        }
        vm.Beams.push(objTodos);
      });
    }

    function graficar() {
   
      if (vm.beam === undefined) {
       
      } else {
       
      }
      var Obj2 = new Object();
      Obj2.FechaInicio = $filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss');
      Obj2.FechaFin = $filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss');
      Obj2.Beam = vm.beam.BeamId;
      terminalFactory.hughesEstadoTerminal(Obj2).then(function (hughesData) {
       
        new Chart(document.getElementById("chartjs-0"), hughesData.DatosGrafica);
        vm.resultados = hughesData.DatosTabla;
      });

    }

    var vm = this;
    vm.FechaInicio = new Date();
    vm.FechaFin = new Date();
    vm.graficar = graficar;
    vm.resultados = {};
    initialData();
  });
