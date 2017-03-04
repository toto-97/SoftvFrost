'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalGestionTerminalCtrl', function($uibModalInstance, $uibModal, terminalFactory,terminal, $rootScope, ngNotify) {

		function initialData() {
		    vm.Terminal=terminal;
		    console.log(terminal);
		    terminalFactory.getComandoList().then(function(data) {
					vm.Comandos = data.GetComandoListResult;
					//Vamos a dejar los comandos dependiendo del estado de la terminal
					if(vm.Terminal.Estatus == "Pendiente"){//Pendiente
						vm.Comandos.splice(7,1);
						vm.Comandos.splice(5,1);
						vm.Comandos.splice(4,1);
						vm.Comandos.splice(3,1);
						vm.Comandos.splice(2,1);
						vm.Comandos.splice(1,1);
						vm.Comandos.splice(0,1);
					}
					else if(vm.Terminal.Estatus == "Activa"){//Activa
						vm.Comandos.splice(8,1);
						vm.Comandos.splice(7,1);
						vm.Comandos.splice(6,1);
						vm.Comandos.splice(2,1);
						vm.Comandos.splice(0,1);
					}
					else if(vm.Terminal.Estatus == "Suspendida"){//Suspendida
						vm.Comandos.splice(8,1);
						vm.Comandos.splice(6,1);
						vm.Comandos.splice(5,1);
						vm.Comandos.splice(4,1);
						vm.Comandos.splice(3,1);
						vm.Comandos.splice(1,1);
						vm.Comandos.splice(0,1);
					}
					else if(vm.Terminal.Estatus == "Cancelada"){//Cancelada
						vm.Comandos.splice(8,1);
						vm.Comandos.splice(7,1);
						vm.Comandos.splice(6,1);
						vm.Comandos.splice(5,1);
						vm.Comandos.splice(4,1);
						vm.Comandos.splice(3,1);
						vm.Comandos.splice(2,1);
						vm.Comandos.splice(1,1);
						vm.Comandos.splice(0,1);
					}
					console.log(vm.Comandos);
		    });
		}

		function AplicaComando() {
			var parametros = new Object();
			if(vm.Comando.IdComando == 1)//Suspender terminal
			{
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = vm.Terminal;
					parametros.status = 2;
					terminalFactory.hughesCambiarStatusServicio(parametros).then(function(hughesData){
						console.log(hughesData);
					});
				});
			}
			else if(vm.Comando.IdComando == 2)//Reactivar terminal
			{
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = vm.Terminal;
					parametros.status = 1;
					terminalFactory.hughesCambiarStatusServicio(parametros).then(function(hughesData){
						console.log(hughesData);
					});
				});
			}
			else if(vm.Comando.IdComando == 3)//Cancelar terminal
			{
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = vm.Terminal;
					parametros.status = 3;
					terminalFactory.hughesCambiarStatusServicio(parametros).then(function(hughesData){
						console.log(hughesData);
					});
				});
			}
			else if(vm.Comando.IdComando == 4)//Token
			{
				parametros.SAN = vm.Terminal;
				parametros.cantidad = vm.cantidadToken;
				terminalFactory.hughesToken(parametros).then(function(hughesData){
					console.log(hughesData);
				});
			}
			else if(vm.Comando.IdComando == 5)//Cambiar servicio
			{
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = vm.Terminal;
					parametros.email = vm.Terminal.suscriptor.email;
					parametros.servicio = vm.Terminal.Servicio;
					terminalFactory.hughesCambioServicio(parametros).then(function(hughesData){
						console.log(hughesData);
					});
				});
			}
			else if(vm.Comando.IdComando == 6)//Ver estatus de movimiento
			{
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = vm.Terminal;
					parametros.email = vm.Terminal.suscriptor.email;
					parametros.servicio = vm.Terminal.Servicio;
					terminalFactory.hughesCambiarStatusServicio(parametros).then(function(hughesData){
						console.log(hughesData);
					});
				});
			}
			else if(vm.Comando.IdComando == 8)//Ver estatus de movimiento
			{
				parametros.SAN = vm.Terminal;
				parametros.telefono = vm.Terminal.suscriptor.telefono;
				parametros.ESN = vm.Terminal.ESN;
				terminalFactory.hughesCambiarStatusServicio(parametros).then(function(hughesData){
					console.log(hughesData);
				});
			}
		}

		function ok() {

		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();


	})
