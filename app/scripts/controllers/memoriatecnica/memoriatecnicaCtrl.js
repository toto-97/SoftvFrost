'use strict';
angular
  .module('softvFrostApp')
  .controller('memoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory) {
    
    function initialData() {
      BuscaMemoriaTecnica(7);
    }

    function BuscaMemoriaTecnica(op) {
      var params = {
        'Folio': (op === 1) ? vm.folio : 0,
        'Fecha': (op === 2) ? vm.fecha : '',
        'IdUsuario': '',
        'orden': (op === 3) ? vm.orden : 0,
        'op': op,
        'SAN': (op === 4) ? vm.SAN : 0,
        'Cliente': (op === 5) ? vm.cliente : '',
        'Contrato': 0,
        'Tecnico': (op === 6) ? vm.tecnico : ''
      };     
      memoriaFactory.BuscaMemoriaTecnica(params)
        .then(function (data) {
          vm.memorias = data.GetBuscaMemoriaTecnicaListResult;
          console.log(data);
        });
    }


    function reportepdf(id) {
      alert(id);
      memoriaFactory.GetReportepdf(id).then(function (data) {
        console.log(data);
      });

    }



    var vm = this;
    vm.op = 0;
    vm.BuscaMemoriaTecnica = BuscaMemoriaTecnica;
    vm.reportepdf = reportepdf;
    initialData();
  });
