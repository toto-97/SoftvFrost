'use strict';
angular.module('softvFrostApp').controller('NuevaTerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory, $uibModal, $rootScope, ngNotify, $state) {
	this.$onInit = function() {
		/*terminalFactory.getServicioList().then(function(data) {
			vm.Servicios = data.GetServicioListResult;
		});*/
	}

	function BuscaSuscriptor() {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalBusquedaSuscriptor.html',
			controller: 'ModalBusquedaSuscriptorCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}

	function ValidarServicio() {
		var parametros = new Object();
		//Obtiene 	transactionSequenceId necesario para las peticiones a Hughes
		terminalFactory.getSequenceId().then(function(Sequence) {
			parametros.transactionSequenceId=Sequence.GetSequenceIdResult.TransactionSequenceId;
			//Obtiene el código del estado para hughes
			terminalFactory.getEstadoById(vm.IdEstado).then(function(data) {
				vm.estado = data.GetEstadoResult;
				parametros.direccion = vm.Calle+' '+vm.Numero;
				parametros.ciudad = vm.Ciudad;
				parametros.estado = vm.estado.Codigo;
				parametros.codigoPostal = vm.CP;
				parametros.latitud = vm.Latitud;
				parametros.longitud = vm.Longuitud;
				//Obtiene el nombre del frupo de servicios disponibles en esa área
				terminalFactory.hughesValidaServicio(parametros).then(function(hughesData){
					console.log(hughesData);
					if (hughesData.EnhancedServicePrequalResponse.Code!='682') {
					    ngNotify.set('Sin área de cobertura', 'error');
					    vm.Servicios ='';
					} else {
						//Filtra los servicios por las disponibilidad en Hughes
						terminalFactory.getServicioListByProgramCode(hughesData.EnhancedServicePrequalResponse.ProductList.Product.ProgramCode).then(function(dataServicios) {
							console.log(dataServicios);
							vm.Servicios = dataServicios.GetServicioListByProgramCodeResult;
						});
					}
				});
			});
		});
	}

	function hughesGetSanCompuesto(obj) {
		var a=obj.toString();
		var i;
		for (i = a.length; i < 9; i++) {
			a='0'+a;
		}
	    return 'TEV'+a;
	};

	function BuscaLatLong() {
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/provision/ModalGetLatLong.html',
			controller: 'ModalGetLatLongCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}
	$rootScope.$on('cliente_seleccionado', function(e, detalle) {
		vm.IdSuscriptor = detalle.IdSuscriptor;
		vm.NombreSuscriptor = detalle.Nombre + ' ' + detalle.Apellido;

		vm.FirstNameSuscriptor=detalle.Nombre;
		vm.LastNameSuscriptor=detalle.Apellido;
		vm.Calle=detalle.Calle;
		vm.Numero=detalle.Numero;
		vm.Ciudad=detalle.Ciudad;
		vm.IdEstado=detalle.IdEstado;
		vm.CP=detalle.CP;
		vm.Telefono=detalle.Telefono;
		vm.Email=detalle.Email;
	});

	$rootScope.$on('get_LatLong', function(e, detalle) {
		vm.Latitud = detalle[0];
		vm.Longuitud = detalle[1];
	});

	function GuardaTerminal() {
		if (vm.IdSuscriptor == null || vm.IdSuscriptor == undefined) {
			ngNotify.set('No se ha definido un suscriptor para la terminal', 'error');
			return;
		}

		var parametros = {
			'IdSuscriptor': vm.IdSuscriptor,
			'IdServicio': vm.Servicio.IdServicio,
			'Latitud': vm.Latitud,
			'Longitud': vm.Longuitud,
			'Estatus': vm.Status.clave,
			'FechaAlta': vm.FechaAlta,
			'FechaSuspension': '',
			'ESN': vm.ESN,
			'Comentarios': vm.Comentarios
		};
		//Guarda la terminal en la base y obtiene el SAN
		terminalFactory.GuardaTerminal(parametros).then(function(data) {
			var obj =new Object();
			//Crea la terminal en la plataforma de Hughes
			terminalFactory.getSequenceId().then(function(Sequence) {
				obj.transactionSequenceId=Sequence.GetSequenceIdResult.TransactionSequenceId;
				obj.SAN=hughesGetSanCompuesto(data.AddTerminalResult);
				obj.nombre=vm.FirstNameSuscriptor;
				obj.apellido=vm.LastNameSuscriptor;
				obj.direccion=vm.Calle+' '+vm.Numero;
				obj.ciudad=vm.Ciudad;
				obj.estado=vm.estado.Codigo;
				obj.codigoPostal=vm.CP;
				obj.latitud=vm.Latitud;
				obj.longitud=vm.Longuitud;
				obj.telefono=vm.Telefono;
				obj.email=vm.Email;
				obj.servicio=vm.Servicio.Nombre;
				//alert(JSON.stringify(obj));
				terminalFactory.hughesCrearTerminal(obj).then(function(hughesData){
					console.log(hughesData);
					if (hughesData.StandardResponse.Code!='5') {
					    ngNotify.set('Error al crear la terminal en la plataforma.', 'error');
					} else {
						var Obj2=new Object();
						Obj2.objMovimiento = new Object();
						Obj2.objMovimiento.SAN=data.AddTerminalResult;
						Obj2.objMovimiento.IdComando=1;//Hardcodeado a la tabla de Comando
						Obj2.objMovimiento.IdUsuario=0;
						Obj2.objMovimiento.IdTicket=0;
						Obj2.objMovimiento.OrderId=hughesData.StandardResponse.OrderId;
						Obj2.objMovimiento.Fecha=hughesData.StandardResponse.MessageHeader.TransactionDateTime;
						Obj2.objMovimiento.Mensaje=hughesData.StandardResponse.Message;
						Obj2.objMovimiento.IdOrigen=2;//Hardcodeado a la tabla de OrigenMovimiento
						Obj2.objMovimiento.Detalle1='';
						Obj2.objMovimiento.Detalle2='';

						terminalFactory.addMovimiento(Obj2).then(function(dataMovimiento){
							ngNotify.set('La terminal se ha guardado correctamente', 'success');
						});
					}
				});
			});
			$state.go('home.provision.terminales');
		});
	}




	var vm = this;
	vm.titulo = "Nueva Terminal";
	vm.BuscaSuscriptor = BuscaSuscriptor;
	vm.ValidarServicio=ValidarServicio;
	vm.BuscaLatLong = BuscaLatLong;
	vm.GuardaTerminal = GuardaTerminal;
	vm.ListaStatus = [{
			'clave': 'Pendiente',
			'Nombre': 'Pendiente'
		},
		{
			'clave': 'Activa',
			'Nombre': 'Activa'
		},
		{
			'clave': 'Suspendida',
			'Nombre': 'Suspendida'
		},
		{
			'clave': 'Cancelada',
			'Nombre': 'Cancelada'
		}
	];
}
