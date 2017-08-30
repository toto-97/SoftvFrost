'use strict';
angular
  .module('softvFrostApp')
  .controller('detallememoriatecnicaCtrl',
    function ($state, ngNotify, memoriaFactory, $localStorage, $stateParams, FileUploader, globalService) {
      function initialData() {

        memoriaFactory.GetObtieneImagenesMemoriaTecnica(vm.id).then(function (response) {
          console.log(response);
          vm.Lista_evidencias = response.GetObtieneImagenesMemoriaTecnicaResult;
          vm.Lista_evidencias.forEach(function (item) {
          item.Ruta=globalService.getUrlmemoriatecnica()+'/'+item.Ruta;
          });

        });
      }
      var vm = this;
      vm.uploader = new FileUploader();
      vm.id = $stateParams.id;
      initialData();
    });
