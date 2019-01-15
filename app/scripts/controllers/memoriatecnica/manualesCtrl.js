'use strict';


angular.module('softvFrostApp').controller('manualesCtrl', manualesCtrl);

function manualesCtrl(globalService, catalogosMemoriaFactory) {

  var vm = this;
  vm.url = globalService.getUrlmemoriatecnicareportes();
  init();

  function init() {
    vm.Manuales = [];
    vm.Videos = [];
    catalogosMemoriaFactory.GetObtieneManuales().then(function (data) {
      var Manuales = data.GetObtieneManualesResult;
      Manuales.forEach(function (item) {
        if (item.Activo == true) {
          if (item.Nombre.includes('.mp4') || item.Nombre.includes('.MP4')) {
            item.Tipo='mp4';
            vm.Videos.push(item);
          }
          else if (item.Nombre.includes('.pdf') || item.Nombre.includes('.PDF')) {
            item.Tipo='pdf';
            vm.Manuales.push(item);
          }
          else if (item.Nombre.includes('.doc') || item.Nombre.includes('.docx')) {
            item.Tipo='word';
            vm.Manuales.push(item);
          }
          else if (item.Nombre.includes('.rar') || item.Nombre.includes('.RAR') || item.Nombre.includes('.zip') || item.Nombre.includes('.ZIP')) {
            item.Tipo='folder';
            vm.Manuales.push(item);
          }
          else {
            item.Tipo='file';
            vm.Manuales.push(item);
          }
        }
      });
    });
  }

}
