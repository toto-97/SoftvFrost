'use strict';
angular

	.module('softvFrostApp')
	.controller('ModalHistoricosTerminalCtrl', function ($filter, $uibModalInstance, $uibModal, terminalFactory, terminal, $rootScope, ngNotify) {

		/// Inicializa los datos de las terminales
		function initialData() {
			vm.Terminal = terminal;
			var Obj2 = new Object();
			Obj2.SAN = vm.Terminal.SAN;
			terminalFactory.hughesConsumoGrafica(Obj2).then(function (hughesData) {
				var colorGrafica = Chart.helpers.color;				
				new Chart(document.getElementById("canvas").getContext("2d"), hughesData);	
			});
		}

		/// No se utiliza
		function ok() {

		}

		/// Gracifa la informacion de las terminales
		function graficar() {
			var Obj2 = new Object();
			Obj2.FechaInicio = $filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss');
			Obj2.FechaFin = $filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss');
			Obj2.SAN = vm.Terminal.SAN;
			terminalFactory.hughesHistoricoConsumo(Obj2).then(function (hughesData) {				
				new Chart(document.getElementById("chartjs-0"), hughesData);
			});
		}

		/// Cancela la operacion 
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.FechaInicio = new Date();
		vm.FechaFin = new Date();
		vm.ok = ok;
		vm.graficar = graficar;
		initialData();


	});

