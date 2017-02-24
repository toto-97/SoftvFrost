'use strict';

function RegistroCtrl(ngNotify, incidenciasFactory, $state) {
	function guardar() {
		var addTi = {
			san: vm.san,
			fecha: vm.fecha,
			sintoma: vm.sintoma,
			prioridad: vm.prioridad,
			descripcion: vm.descripcion,
			nombreContrato: vm.nombreContrato,
			numeroContrato: vm.numeroContrato
		};
		console.log(addTi);
		// incidenciasFactory.addSuscriptor(addTi).then(function(data) {
		// 	if (data.AddTicketResult > 0) {
		// 		ngNotify.set('Suscriptor agregado correctamente.', 'success');
		// 		$state.go('home.incidiencias.registro');
		// 	} else {
		// 		ngNotify.set('Error al agregar el suscriptor.', 'error');
		// 	}
		// });
	}

	function getTerminal() {
		console.log(vm.terminal);
		incidenciasFactory.getTerminal(vm.terminal).then(function(data) {
			vm.terminalDatos = data.GetByTerminalResult;
			console.log(vm.terminalDatos);
		});
	}

	function limpiar() {
		vm.terminal = '';
		vm.motivo = '';
		vm.sintoma = '';
		vm.tipoContacto = '';
		vm.medioComun = '';
	}

	var vm = this;
	vm.guardar = guardar;
	vm.limpiar = limpiar;
	vm.getTerminal = getTerminal;
}
angular.module('softvFrostApp').controller('RegistroCtrl', RegistroCtrl);
