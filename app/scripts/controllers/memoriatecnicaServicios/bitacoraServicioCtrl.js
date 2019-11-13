'use strict';
angular
  .module('softvFrostApp')
  .controller('bitacoraServicioCtrl', function ($state, ngNotify, memoriaServicioFactory, $localStorage) {

    /// Busca ciertos tipos de tados de la bitacora
    function Init() {

      Obtenbitacora(0);
    }

    /// Obttiene los datos de la bitacora
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
