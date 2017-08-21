'use strict';
angular
  .module('softvFrostApp')
  .controller('ModalAvancesCtrl', function ($uibModalInstance, $uibModal, $rootScope, quejasFactory, ngNotify, $localStorage, $state, options,globalService) {

    function initialData() {
      console.log(options);
      quejasFactory.ObtieneAvancesQueja(options.ClvOrden).then(function (data) {
        vm.lista = data.GetDeepObtieneAvancesQuejaResult;
      });
    }

    function GetFileAvanceQueja(x) {
      if (x.TipoArchivo == 'Imagen') {
        quejasFactory.GetFileAvanceQueja(x.Clv_Avance, x.TipoArchivo).then(function (data) {
          vm.showimg=true;
          vm.Imagesrc = globalService.getUrlReportes()+'/Reportes/'+ data.GetFileAvanceQuejaResult.Observaciones;
        });
      } else {

      }

    }

    function ok() {
      $uibModalInstance.dismiss('cancel');
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ValidaArchivo() {
      console.log(vm.descripcion);
      console.log($('#file').get(0).files);
      var files = $('#file').get(0).files;
      if (files.length === 0) {
        ngNotify.set('Se necesita seleccionar un archivo válido', 'error');
        return;
      } else {
        quejasFactory.UploadFile(files, vm.descripcion, options.ClvOrden).then(function (data) {
          console.log(data);
        })
      }

    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.ValidaArchivo = ValidaArchivo;
    vm.GetFileAvanceQueja = GetFileAvanceQueja;
    vm.showimg=false;
    vm.showpdf=false;
    initialData();
  });
