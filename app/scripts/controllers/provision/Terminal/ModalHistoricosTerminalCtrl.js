'use strict';
angular

	.module('softvFrostApp')
	.controller('ModalHistoricosTerminalCtrl', function ($filter, $uibModalInstance, $uibModal, terminalFactory, terminal, $rootScope, ngNotify) {

		function initialData() {
			vm.Terminal = terminal;
			var Obj2 = new Object();
			Obj2.SAN = vm.Terminal.SAN;
			terminalFactory.hughesConsumoGrafica(Obj2).then(function (hughesData) {
				var colorGrafica = Chart.helpers.color;
				console.log(JSON.stringify(hughesData));
				new Chart(document.getElementById("canvas").getContext("2d"), hughesData);	
			});
		}

		function ok() {

		}

		function graficar() {
			var Obj2 = new Object();
			Obj2.FechaInicio = $filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss');
			Obj2.FechaFin = $filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss');
			Obj2.SAN = vm.Terminal.SAN;
			terminalFactory.hughesHistoricoConsumo(Obj2).then(function (hughesData) {
				console.log(hughesData);
				new Chart(document.getElementById("chartjs-0"), hughesData);
			});
		}

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

