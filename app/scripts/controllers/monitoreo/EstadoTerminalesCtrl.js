'use strict';
angular

	.module('softvFrostApp')
	.controller('EstadoTerminalesCtrl', function ($filter, $uibModal, terminalFactory, mapaBeamFactory, $rootScope, ngNotify) {

		function initialData() {
			mapaBeamFactory.GetBeamList().then(function (result) {
				console.log(result);
				vm.Beams = result.GetBeamListResult;
				var objTodos = {
					BaseRemoteIp: null,
					BeamId:	0,
					FilePath: "",
					Name: "Todos"
				}
				vm.Beams.push(objTodos);
			});
		}

		function graficar() {
			console.log($filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss'));
			console.log($filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss'));
			if (vm.beam === undefined) {
			    console.log(0);
			} else {
			    console.log(vm.beam.BeamId);
			}
			var Obj2 = new Object();
			Obj2.FechaInicio = $filter('date')(vm.FechaInicio, 'dd/MM/yyyy HH:mm:ss');
			Obj2.FechaFin = $filter('date')(vm.FechaFin, 'dd/MM/yyyy HH:mm:ss');
			Obj2.Beam = vm.beam.BeamId;
			terminalFactory.hughesEstadoTerminal(Obj2).then(function (hughesData) {
				console.log(hughesData);
				new Chart(document.getElementById("chartjs-0"), hughesData.DatosGrafica);
				vm.resultados = hughesData.DatosTabla;
			});

		}
		
		var vm = this;
		vm.FechaInicio = new Date();
		vm.FechaFin = new Date();
		vm.graficar = graficar;
		vm.resultados = {};
		initialData();
	});
