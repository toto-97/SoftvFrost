'use strict';
angular
  .module('softvFrostApp')
  .controller('memoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory, moment, $firebaseArray,
    firebase, globalService,$q) {

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
        Mensaje: 'Se ha generado una nueva memoria técnica',
        Tipo: 1
      });
    }

    function deletechild() {
      var id = vm.deletetest;
      GetdataFire().then(function (result) {
        result.forEach(function (item, index) {
          if (parseInt(item.Id) === parseInt(id)) {
            deleteFile(index).then(function (result) {
              console.log(result);
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
    vm.add=add;
    vm.deletechild=deletechild;
    initialData();
  });
