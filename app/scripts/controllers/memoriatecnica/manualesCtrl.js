'use strict';

function manualesCtrl(globalService) {

  var vm = this;
  vm.url = globalService.getUrlmemoriatecnicareportes();

}
angular.module('softvFrostApp').controller('manualesCtrl', manualesCtrl);
