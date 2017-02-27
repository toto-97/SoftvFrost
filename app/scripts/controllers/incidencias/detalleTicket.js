'use strict';

function DetalleTicketCtrl($uibModalInstance, $localStorage, ticket, incidenciasFactory, $filter) {
    function initial() {
        vm.fecha = new Date();
        vm.showFirstTab = function(){
            angular.element('[data-target="#tab1"]').tab('show');
        }
        incidenciasFactory.getTicketDetalle(ticket).then(function(data) {
			vm.detalleTicket = data.GetDeepTicketResult;
		});
        incidenciasFactory.getSolucion().then(function(data) {
			data.GetSolucionTicketListResult.unshift({
				'Descripcion': 'Seleccione solución',
				'IdSolucion': 0
			});
			vm.solucion = data.GetSolucionTicketListResult;
			vm.selectedSolucion = vm.solucion[0];
		});
    }

    function closeTicket() {
        console.log('close');
        if (vm.solucion == 0) {
			ngNotify.set('Inserte todos los campos para cerrar el ticket.', 'error');
		}else {
			vm.auxFecha = $filter('date')(vm.fechaCierre, 'yyyy/MM/dd');
			var closeTi = {
				ticket: ticket,
				fechaCierre: vm.auxFecha,
				solucion: vm.selectedSolucion.IdSolucion,
				causa: vm.causa,
				descripcionSolucion: vm.descripcionSolucion
			};
            console.log(closeTi);
			// incidenciasFactory.closeTicket(closeTi).then(function(data) {
			// 	console.log(data);
			// 	if (data.UpdateTicketResult > 0) {
			// 		ngNotify.set('Ticket cerrado correctamente.', 'success');
			// 		$state.go('home.incidencias.registro');
			// 	} else {
			// 		ngNotify.set('Error al agregar el suscriptor.', 'error');
			// 	}
			// });
		}
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

	var vm = this;
    vm.cancel = cancel
    vm.usuario = $localStorage.currentUser.usuario;
    vm.closeTicket = closeTicket;
    vm.fechaCierre = new Date();

    initial();
}

angular.module('softvFrostApp').controller('DetalleTicketCtrl', DetalleTicketCtrl);
