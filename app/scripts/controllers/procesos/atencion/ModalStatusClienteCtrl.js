'use strict';
angular
  .module('softvFrostApp')
  .controller('ModalStatusClienteCtrl', function ($uibModalInstance, atencionFactory, status) {

    /// Especifica el status de un cliente
    function initialData() {
    
      vm.mensaje = '';
      if (status === 'I') {
        vm.mensaje = 'El cliente se encuentra en status de Instalado';
      } else if (status === 'C') {
        vm.mensaje = 'El cliente se encuentra pendiente de Instalar';
      } else if (status === 'D') {
        vm.mensaje = 'El cliente se encuentra en status de Desconectado';
      } else if (status === 'S') {
        vm.mensaje = 'El cliente se encuentra en status  de Suspendido';
      } else if (status === 'B') {
        vm.mensaje = 'El cliente se encuentra en status  de Baja';
      }

    }

    /// Cierra el HTML con el status del cliente
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }



    var vm = this;
    vm.cancel = cancel;
    initialData();
  });
