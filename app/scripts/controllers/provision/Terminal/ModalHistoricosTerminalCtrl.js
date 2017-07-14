'use strict';
angular

	.module('softvFrostApp')
	.controller('ModalHistoricosTerminalCtrl', function ($filter, $uibModalInstance, $uibModal, terminalFactory, terminal, $rootScope, ngNotify) {

		function initialData() {
			vm.Terminal = terminal;
			console.log(vm.Terminal);
		}

		function ok() {

		}

		function graficar() {
			var Obj2 = new Object();
			vm.fechaAuxiliar = new Date();
			Obj2.FechaInicio = vm.FechaInicio + ' ' + vm.HoraInicio;//$filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
			vm.fechaAuxiliar2 = new Date();
			Obj2.FechaFin =  vm.FechaFin + ' ' + vm.HoraFin;//$filter('date')(vm.fechaAuxiliar2, 'dd/MM/yyyy HH:mm:ss');
			alert(vm.FechaInicio);
			alert(Obj2.FechaFin);
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
		vm.HoraFin = new Time();
		vm.HoraInicio = new Time();
		vm.ok = ok;
		vm.graficar = graficar;
		initialData();


	});

