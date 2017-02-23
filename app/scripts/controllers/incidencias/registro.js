'use strict';

function RegistroCtrl(ngNotify, incidenciasFactory, $state) {
	function guardar() {
		var addTi = {
			ticketPadre: 0,
			san: 1,
			fecha: vm.fecha,
			sintoma: vm.sintoma,
			prioridad: vm.prioridad,
			descripcion: vm.descripcion
		};
		incidenciasFactory.addSuscriptor(addTi).then(function(data) {
			if (data.AddTicketResult > 0) {
				ngNotify.set('Suscriptor agregado correctamente.', 'success');
				$state.go('home.incidiencias.registro');
			} else {
				ngNotify.set('Error al agregar el suscriptor.', 'error');
			}
		});
	}

	var vm = this;
	vm.guardar = guardar;
}
angular.module('softvFrostApp').controller('RegistroCtrl', RegistroCtrl);
