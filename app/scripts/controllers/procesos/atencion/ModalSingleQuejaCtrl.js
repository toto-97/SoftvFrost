'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalSingleQuejaCtrl', function($uibModalInstance, cajasFactory, clave, globalService) {

		/// Extrae la informacion de una queja
		function initialData() {
			cajasFactory.dameSingleQueja(clave).then(function(data) {
				vm.url = globalService.getUrlReportes() + '/Reportes/' + data.GetConsultarQuejasTableListResult[0].Colonia;
				
				$('#reporteURL').attr('src', vm.url);
			});
		}

		/// Cierra el HTML con la informacion de la queja
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initialData();
	});
