'use strict';
angular.module('softvFrostApp').controller('DetalleTerminalCtrl', function (
  SuscriptorFactory,
  $rootScope,
  ngNotify,
  mapaBeamFactory,
  $stateParams,
  $state,
  $window,
  NgMap) {
  var vm = this;

  /// Hace una conexion al factory para obtener informacion de las terminales
  this.$onInit = function () {
    mapaBeamFactory.GetTerminalStatus($stateParams.id).then(function (response) {
      var dato = JSON.parse(response)
      if (dato.message != undefined) {
        ngNotify.set(dato.message, 'warn');
        $window.history.back();
        $state.go('home.monitoreo.MapaTerminales');
      } else {
        vm.datosterminal = JSON.parse(response);

      }

    });
  }


});
