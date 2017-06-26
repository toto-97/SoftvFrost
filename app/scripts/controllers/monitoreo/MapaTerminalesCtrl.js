'use strict';
angular
  .module('softvFrostApp')
  .controller('MapaTerminalesCtrl', ModalGetLatLongCtrl);

function ModalGetLatLongCtrl(SuscriptorFactory, terminalFactory, $rootScope, ngNotify, NgMap, mapaBeamFactory, globalService) {
  this.$onInit = function () {

    mapaBeamFactory.GetBeamList().then(function (data) {
      console.log(data);
      vm.Beams = data.GetBeamListResult;
      vm.UrlBeam = globalService.getUrlBeams() + data.GetBeamListResult[1].FilePath;
      console.log(vm.UrlBeam);
    });

    NgMap.getMap().then(function (map) {
      vm.map = map;
      google.maps.event.trigger(vm.map, 'resize');
    });
  }


  function ObtenerCoordenadasTerminales(terminales) {


    for (var i = 0; i < terminales.length; i++) {
      var obj = {};
      obj.data = terminales[i];
      obj.san = terminales[i].SAN;
      obj.ESN = terminales[i].ESN;
      obj.Lat = terminales[i].Latitud;
      obj.Lng = terminales[i].Longitud;
      vm.Terminales.push(obj);
    }
    console.log(vm.Terminales);

  }

  function DetalleTerminal(x) {
    console.log(x);
    var san = hughesGetSanCompuesto(this.id);
    mapaBeamFactory.GetTerminalStatus(san).then(function (response) {
      console.log(response);
    });
  }


	function hughesGetSanCompuesto(obj) {
			var a = obj.toString();
			var i;
			for (i = a.length; i < 9; i++) {
				a = '0' + a;
			}
			return 'TLV' + a;
		};



  function DetalleBeam(obj) {
    console.log(obj);
    vm.UrlBeam = globalService.getUrlBeams() + obj.FilePath;
    mapaBeamFactory.GetBeamUsage('outroute', obj.BeamId).then(function (data) {
      vm.datosoutroute = JSON.parse(data);
      console.log(vm.datosoutroute);
      mapaBeamFactory.GetBeamUsage('inroute', obj.BeamId).then(function (data) {
        vm.datosinroute = JSON.parse(data);
        console.log(vm.datosinroute);
        terminalFactory.getTerminalList().then(function (data) {

          vm.terminales_ = data.GetTerminalListResult
          ObtenerCoordenadasTerminales(vm.terminales_);
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
