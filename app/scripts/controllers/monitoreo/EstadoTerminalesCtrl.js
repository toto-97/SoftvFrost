'use strict';
angular

	.module('softvFrostApp')
	.controller('EstadoTerminalesCtrl', function ($filter, $uibModal, mapaBeamFactory, $rootScope, ngNotify) {

		function initialData() {
			mapaBeamFactory.GetBeamList().then(function (result) {
	          console.log(result);
	          vm.Beams = result.GetBeamListResult;
	        });
		}

		

		function graficar() {
			/*var Obj2 = new Object();
			Obj2.FechaInicio = $filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss');
			Obj2.FechaFin = $filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss');
			Obj2.SAN = vm.Terminal.SAN;
			terminalFactory.hughesHistoricoConsumo(Obj2).then(function (hughesData) {
				console.log(hughesData);
				new Chart(document.getElementById("chartjs-0"), hughesData);
			});*/
			console.log($filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss'));
			console.log($filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss'));
			if (vm.beam === undefined) {
			    console.log(0);
			} else {
			    console.log(vm.beam.BeamId);
			}
			

		}


		var vm = this;
		vm.FechaInicio = new Date();
		vm.FechaFin = new Date();
		vm.graficar = graficar;
		initialData();


	});
