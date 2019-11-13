'use strict';
angular
  .module('softvFrostApp')
  .controller('bitacoraCtrl', function ($state, ngNotify, memoriaFactory, $localStorage) {

    /// Funcion inicial para buscar los datos de la bitacora
    function Init() {

      Obtenbitacora(0);
    }

    /// Muestra ls datos de la bitacora  desde el factory de la memoria
    function Obtenbitacora(op) {
      var obj = {
        'Idmemoria': (op === 0) ? vm.Idmemoria : 0,
        'Folio': (op === 1) ? vm.Folio : 0,
        'SAN': (op === 2) ? vm.SAN : 0,
        'Contrato': (op === 3) ? vm.contrato : '',
        'Op': op,
        'IdUsuario':$localStorage.currentUser.idUsuario
      };

      memoriaFactory.GetObtieneBitacoraPorIdMemoria(obj).then(function (result) {
        vm.registros = result.GetObtieneBitacoraPorIdMemoriaResult;
      });
    }


    var vm = this;
    vm.Idmemoria = 0;
    Init();
    vm.Obtenbitacora = Obtenbitacora;


  });
