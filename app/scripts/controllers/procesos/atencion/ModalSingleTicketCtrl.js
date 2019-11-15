'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalSingleTicketCtrl', function($uibModalInstance, cajasFactory, factura, imprimir) {

		/// Obtiene la informacion de los ticket
		function initialData() {
			cajasFactory.dameTicket(factura).then(function(data) {
				vm.datosTicket = data.GetCrearTicketTableListResult[0];
			});
			cajasFactory.dameDatosPago(factura).then(function(data) {
				vm.datosPago = data.GetConceptosTicketPagosListResult;
			});
			vm.mostrarImprimir = imprimir;
		}

		/// Cierra el HTML con la informacion del ticket
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		/// Imprime la informacion en un DIV en el HTML
		function printDiv(divName) {
			var printContents = document.getElementById(divName).innerHTML;
			var popupWin = window.open('', '_blank', 'width=1000,height=700');
			popupWin.document.open();
			popupWin.document.write('<html><head><link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
			popupWin.document.close();
		}

		var vm = this;
		vm.cancel = cancel;
		vm.printDiv = printDiv;
		vm.mostrarImprimir = true;
		initialData();
	});
