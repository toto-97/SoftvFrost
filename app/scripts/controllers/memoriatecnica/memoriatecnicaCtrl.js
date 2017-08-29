'use strict';
angular
  .module('softvFrostApp')
  .controller('memoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory) {
    function initialData() {
      BuscaMemoriaTecnica();
    }

    function BuscaMemoriaTecnica() {

      var params = {
        'Folio': (vm.op === 1 && (vm.folio !== undefined && vm.folio !== null && vm.folio !== '')) ? vm.folio : 0,
        'Fecha': (vm.op === 2 && (vm.fecha !== undefined && vm.fecha !== null && vm.fecha !== '')) ? vm.fecha : '',
        'IdUsuario': '',
        'orden': (vm.op === 3 && (vm.orden !== undefined && vm.orden !== null && vm.orden !== '')) ? vm.orden : 0,
        'op': vm.op
      };
      console.log(params);
      memoriaFactory.BuscaMemoriaTecnica(params)
        .then(function (data) {
          vm.memorias = data.GetBuscaMemoriaTecnicaListResult;
          console.log(data);
        });
    }



    var vm = this;
    vm.op = 0;
    vm.BuscaMemoriaTecnica = BuscaMemoriaTecnica;
    initialData();
  });
