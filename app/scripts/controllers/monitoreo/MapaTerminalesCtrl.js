'use strict';
angular
  .module('softvFrostApp')
  .controller('MapaTerminalesCtrl', MapaTerminalesCtrl);

function MapaTerminalesCtrl($uibModal, SuscriptorFactory, terminalFactory, $rootScope, ngNotify, NgMap, mapaBeamFactory, globalService, $state) {
  this.$onInit = function () {

    mapaBeamFactory.GetBeamList().then(function (data) {

      vm.Beams = data.GetBeamListResult;
      vm.UrlBeam = globalService.getUrlBeams() + data.GetBeamListResult[1].FilePath;
      DetalleBeam(data.GetBeamListResult[0]);
    });
    NgMap.getMap().then(function (map) {
      vm.map = map;
      google.maps.event.trigger(vm.map, 'resize');
    });
  }
  function ObtenerCoordenadasTerminales(terminales, beamid) {
     vm.Terminales = [];
    for (var i = 0; i < terminales.length; i++) {

      if (terminales[i].BeamID == beamid) {
        var obj = {};
        obj.data = terminales[i];
        obj.san = terminales[i].SAN;
        obj.ESN = terminales[i].ESN;
        obj.Lat = terminales[i].Latitud;
        obj.Lng = terminales[i].Longitud;
        vm.Terminales.push(obj);
      }
    }


  }

  function DetalleTerminal(x) {

    var id = hughesGetSanCompuesto(this.id);
    $state.go('home.monitoreo.DetalleTerminal', {
      'id': id
    });
    }
  function hughesGetSanCompuesto(obj) {
    var a = obj.toString();
    var i;
    for (i = a.length; i < 9; i++) {
      a = '0' + a;
    }
    return globalService.getType() + a;
  };

  function DetalleBeam(obj) {
     vm.BeamId=obj.BeamId;
      var a = obj.BeamId.toString();
    
      if(a.length ==2){
        vm.BeamId='0'+obj.BeamId
      }

console.log(vm.BeamId);
console.log(obj.FilePath);
    vm.UrlBeam = globalService.getUrlBeams() + obj.FilePath;
    mapaBeamFactory.GetBeamUsage('outroute', vm.BeamId).then(function (data) {
      vm.datosoutroute = JSON.parse(data);
      mapaBeamFactory.GetBeamUsage('inroute', vm.BeamId).then(function (data) {
        vm.datosinroute = JSON.parse(data);
        terminalFactory.getTerminalList().then(function (data) {
          vm.terminales_ = data.GetTerminalListResult;
          ObtenerCoordenadasTerminales(vm.terminales_, obj.BeamId);
        });
      });
    });
    google.maps.event.trigger(vm.map, 'resize');
  }
  var vm = this;
  vm.DetalleBeam = DetalleBeam;
  vm.Terminales = [];
  vm.DetalleTerminal = DetalleTerminal;

}
