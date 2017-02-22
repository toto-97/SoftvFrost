'use strict';
angular.module('softvFrostApp').controller('SuscriptorCtrl', SuscriptorCtrl);

function SuscriptorCtrl() {

	function DetalleSuscriptor(object) {
		alert('detalle');
	}

	function DetalleTerminales() {
		alert('terminales');
	}

	function DetalleMovimientos() {
		alert('Movimientos');
	}


	var vm = this;
	vm.DetalleSuscriptor = DetalleSuscriptor;
	vm.DetalleTerminales = DetalleTerminales;
	vm.DetalleMovimientos = DetalleMovimientos;
	vm.hola = 'adsasdas';
}
