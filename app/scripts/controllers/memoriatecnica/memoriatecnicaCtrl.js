'use strict';
angular
  .module('softvFrostApp')
  .controller('memoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory, moment, $firebaseArray,
    firebase, globalService, $q, $window) {

    function initialData() {
      BuscaMemoriaTecnica(0);
    }

    function BuscaMemoriaTecnica(op) {
      var params = {
        'Folio': (op === 1) ? vm.folio : '',
        'Fecha': (op === 2) ? vm.fecha : '',
        'IdUsuario': '',
        'orden': (op === 3) ? vm.orden : 0,
        'op': op,
        'SAN': (op === 4) ? vm.SAN : 0,
        'Cliente': (op === 5) ? vm.cliente : '',
        'Contrato': (op === 7) ? vm.contrato : '',
        'Tecnico': (op === 6) ? vm.tecnico : '',
        'SerieAparato': (op === 8) ? vm.serie : ''
      };
      memoriaFactory.BuscaMemoriaTecnica(params)
        .then(function (data) {
          vm.memorias = data.GetBuscaMemoriaTecnicaListResult;
         
        });
    }


    function reportepdf(id) {

      vm.url = '';
      memoriaFactory.GetReportepdf(id).then(function (data) {
       

        vm.url = globalService.getUrlmemoriatecnicareportes() + '/ReportesPDF/' + data.GetReportepdfResult;
        //  $window.open( vm.url, '_self');
        /* var anchor = angular.element('<a/>');
         anchor.attr({
           href: vm.url,
           target: '_blank',
           download: vm.url
         })[0].click();*/

        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;


        if (isChrome) {
          var url = window.URL || window.webkitURL;

          var downloadLink = angular.element('<a></a>');
          downloadLink.attr('href', vm.url);
          downloadLink.attr('target', '_self');
          downloadLink.attr('download', 'invoice.pdf');
          downloadLink[0].click();
        } else if (isEdge || isIE) {
          window.navigator.msSaveOrOpenBlob(vm.url, 'invoice.pdf');

        } else {
          var fileURL = vm.url;
          window.open(fileURL);
        }



      });

    }

    function getreportexls(id) {
      vm.url = '';
      memoriaFactory.GetReportexls(id).then(function (data) {
      
        vm.url = globalService.getUrlmemoriatecnicareportes() + '/ReportesPDF/' + data.GetReportexlsResult;
        $window.open(vm.url, '_self');

        /* var anchor = angular.element('<a/>');
         anchor.attr({
           href: vm.url,
           target: '_blank',
           download: vm.url
         })[0].click();*/
      });

    }

    function add() {
      alert('add');
      var ref = firebase
        .database()
        .ref()
        .child("messages");
      vm.messages = $firebaseArray(ref);
      vm.messages.$add({
        Id: vm.addtest,
        Fecha: moment().format("L"),
        Hora: moment().format("LT"),
        Mensaje: 'Se ha generado una nueva memoria técnica de servicios',
        Tipo: 1
      });
    }

    function deletechild() {
      var id = vm.deletetest;
      GetdataFire().then(function (result) {
        result.forEach(function (item, index) {
          if (parseInt(item.Id) === parseInt(id)) {
            deleteFile(index).then(function (result) {
            
            });

          }
        });

      });
    }

    var ref = firebase
      .database()
      .ref()
      .child('messages');

    function GetdataFire() {
      var defered = $q.defer();
      var promise = defered.promise;
      var registros = [];
      var posts = $firebaseArray(ref);
      posts.$loaded().then(function (x) {
        x.forEach(function (item) {
          registros.push(item);
        });
        defered.resolve(registros);
      }).catch(function (err) {
        defered.reject(err)
      });
      return promise;
    }

    function deleteFile(index) {
      var defered = $q.defer();
      var promise = defered.promise;
      var posts = $firebaseArray(ref);
      posts.$loaded().then(function (x) {
        posts.$remove(index).then(function (ref) {
          defered.resolve(true);
        });

      }).catch(function (err) {
        defered.reject(false)
      });
      return promise;

    }




    var vm = this;
    vm.op = 0;
    vm.BuscaMemoriaTecnica = BuscaMemoriaTecnica;
    vm.reportepdf = reportepdf;
    vm.getreportexls = getreportexls;
    vm.add = add;
    vm.deletechild = deletechild;
    initialData();
  });
