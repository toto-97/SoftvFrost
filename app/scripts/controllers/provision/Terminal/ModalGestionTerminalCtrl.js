'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalGestionTerminalCtrl', function($filter, $uibModalInstance, $uibModal, terminalFactory,terminal, $rootScope, ngNotify) {

		function initialData() {
		    vm.Terminal=terminal;
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
						terminalFactory.getServicioList().then(function(data) {
							vm.Servicios = data.GetServicioListResult;
						});
						console.log(vm.Comandos);
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
		    });
		}

		function aplicaComando() {
			console.log(vm.Terminal);
			var parametros = new Object();
			if(vm.Comando.IdComando == 1)//
			{
				alert("1");
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = "TLVPG0000001";//vm.Terminal;
					parametros.status = 2;
					alert("2");
					terminalFactory.hughesCambiarStatusServicio(parametros).then(function(hughesData){
						console.log(hughesData);
					});
				});
			}
			else if(vm.Comando.IdComando == 2)//Suspender terminal
			{
				terminalFactory.getSequenceId().then(function(Sequence) {
					parametros.transactionSequenceId = Sequence.GetSequenceIdResult.TransactionSequenceId;
					parametros.SAN = hughesGetSanCompuesto(vm.Terminal);
					parametros.status = 2;
					alert(JSON.stringify(parametros));
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
			else if(vm.Comando.IdComando == 9)//Activar
			{
				terminalFactory.getSuscriptorById(vm.Terminal.IdSuscriptor).then(function(data){
					var suscriptor = data.GetSuscriptorResult;
					parametros.telefono = suscriptor.Telefono;
					parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
					parametros.ESN = vm.Terminal.ESN;
					alert(JSON.stringify(parametros));
					terminalFactory.hughesActivarTerminal(parametros).then(function(hughesData){
						console.log(hughesData);
						if(hughesData.envEnvelope.envBody.cmcActivationResponseMsg.Status == "FAILED"){
							var Obj2=new Object();
				      Obj2.objMovimiento = new Object();
				      Obj2.objMovimiento.SAN=vm.Terminal.SAN;
				      Obj2.objMovimiento.IdComando=9;//Hardcodeado a la tabla de Comando
				      Obj2.objMovimiento.IdUsuario=0;
				      Obj2.objMovimiento.IdTicket=0;
				      Obj2.objMovimiento.OrderId=0;
							vm.fechaAuxiliar = new Date();
				      Obj2.objMovimiento.Fecha=$filter('date')(vm.fechaAuxiliar, 'yyyy/MM/dd HH:mm:ss');
				      Obj2.objMovimiento.Mensaje=hughesData.envEnvelope.envBody.cmcActivationResponseMsg.MessageText;
				      Obj2.objMovimiento.IdOrigen=2;//Hardcodeado a la tabla de OrigenMovimiento
				      Obj2.objMovimiento.Detalle1='';
				      Obj2.objMovimiento.Detalle2='';
							terminalFactory.addMovimiento(Obj2).then(function(dataMovimiento){
				       ngNotify.set('Error al activar la terminal. Consulte el detalle del movimiento para más detalle', 'error');
				      });

						}
						else{
							var Obj2=new Object();
				      Obj2.objMovimiento = new Object();
				      Obj2.objMovimiento.SAN=vm.Terminal.SAN;
				      Obj2.objMovimiento.IdComando=9;//Hardcodeado a la tabla de Comando
				      Obj2.objMovimiento.IdUsuario=0;
				      Obj2.objMovimiento.IdTicket=0;
				      Obj2.objMovimiento.OrderId=0;
							vm.fechaAuxiliar = new Date();
				      Obj2.objMovimiento.Fecha=$filter('date')(vm.fechaAuxiliar, 'yyyy/MM/dd HH:mm:ss');
				      Obj2.objMovimiento.Mensaje=hughesData.envEnvelope.envBody.cmcActivationResponseMsg.MessageText;
				      Obj2.objMovimiento.IdOrigen=2;//Hardcodeado a la tabla de OrigenMovimiento
				      Obj2.objMovimiento.Detalle1='';
				      Obj2.objMovimiento.Detalle2='';

				      terminalFactory.addMovimiento(Obj2).then(function(dataMovimiento){
				       ngNotify.set('La terminal se ha activado correctamente', 'success');
				      });
						}
					});
				});
			}
		}

		function ok() {

		}
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function hughesGetSanCompuesto(obj) {
		 var a=obj.toString();
		 var i;
		 for (i = a.length; i < 9; i++) {
			a='0'+a;
		 }
				return 'TEV'+a;
		};

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
		vm.aplicaComando = aplicaComando;


	})
