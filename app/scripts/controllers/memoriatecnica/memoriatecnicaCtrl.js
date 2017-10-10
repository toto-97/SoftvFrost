'use strict';
angular
  .module('softvFrostApp')
  .controller('memoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory, moment,$firebaseArray,globalService) {

    function initialData() {
  
        
     
      //console.log(moment().format('L'));
      /*var ref = firebase.database().ref().child("messages");
      console.log(ref);
      vm.messages = $firebaseArray(ref);
      vm.messages.$add({
        'Idmemoria': 1,
        'Fecha': moment().format('L'),
        'Hora': moment().format('LT')
      });
*/

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
      memoriaFactory.GetReportepdf(id).then(function (data) {
        console.log(data);

         vm.url = globalService.getUrlmemoriatecnicareportes() + '/ReportesPDF/' + data.GetReportepdfResult;
          //document.getElementById("downloadbtn").click();
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: vm.url,
            target: '_blank',
            download: vm.url
          })[0].click();
      });

    }

      function getreportexls(id) {    
      memoriaFactory.GetReportexls(id).then(function (data) {
        console.log(data);
         vm.url = globalService.getUrlmemoriatecnicareportes() + '/ReportesPDF/' + data.GetReportexlsResult;
          //document.getElementById("downloadbtn").click();
          var anchor = angular.element('<a/>');
          anchor.attr({
            href: vm.url,
            target: '_blank',
            download: vm.url
          })[0].click();
      });

    }



    var vm = this;
    vm.op = 0;
    vm.BuscaMemoriaTecnica = BuscaMemoriaTecnica;
    vm.reportepdf = reportepdf;
    vm.getreportexls=getreportexls;
    initialData();
  });
