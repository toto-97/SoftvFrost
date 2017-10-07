'use strict';
angular
  .module('softvFrostApp')
  .controller('bitacoraCtrl', function ($state, ngNotify, memoriaFactory) {

    function Init() {
      Obtenbitacora();
    }

    function Obtenbitacora() {       
      memoriaFactory.GetObtieneBitacoraPorIdMemoria(vm.id).then(function (result) {
        vm.registros=result.GetObtieneBitacoraPorIdMemoriaResult;
      });
    }


    var vm = this;
    vm.id = 0;
    Init();
    vm.Obtenbitacora=Obtenbitacora;


  });
