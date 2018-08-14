'use strict';
angular
  .module('softvFrostApp')
  .controller('bitacoraServicioCtrl', function ($state, ngNotify, memoriaServicioFactory, $localStorage) {

    function Init() {

      Obtenbitacora(0);
    }

    function Obtenbitacora(op) {
      var obj = {
        'Idmemoria': (op === 0) ? vm.Idmemoria : 0,
        'Folio': (op === 1) ? vm.Folio : 0,
        'SAN': (op === 2) ? vm.SAN : 0,
        'Contrato': (op === 3) ? vm.contrato : '',
        'Op': op,
        'IdUsuario':$localStorage.currentUser.idUsuario
      };

      memoriaServicioFactory.GetObtieneBitacoraPorIdMemoria(obj).then(function (result) {
        vm.registros = result.GetObtieneBitacoraPorIdMemoriaServicioResult;
      });
    }


    var vm = this;
    vm.Idmemoria = 0;
    Init();
    vm.Obtenbitacora = Obtenbitacora;


  });
