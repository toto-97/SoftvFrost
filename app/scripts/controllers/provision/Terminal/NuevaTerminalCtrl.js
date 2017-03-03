'use strict';
angular.module('softvFrostApp').controller('NuevaTerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory, $uibModal, $rootScope, ngNotify, $state) {
	this.$onInit = function() {
		terminalFactory.getServicioList().then(function(data) {
			vm.Servicios = data.GetServicioListResult;
		});
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
		terminalFactory.getSequenceId().then(function(Sequence) {
			parametros.transactionSequenceId=Sequence.GetSequenceIdResult.TransactionSequenceId;
			terminalFactory.getEstadoById(vm.IdEstado).then(function(data) {
				vm.estado = data.GetEstadoResult;
				parametros.direccion = vm.Calle+' '+vm.Numero;
				parametros.ciudad = vm.Ciudad;
				parametros.estado = vm.estado.Codigo;
				parametros.codigoPostal = vm.CP;
				parametros.latitud = vm.Latitud;
				parametros.longitud = vm.Longuitud;
				console.log(JSON.stringify(parametros));
				jQuery.support.cors = true;
				terminalFactory.hughesValidaServicio(parametros).then(function(hughesData){
					console.log(hughesData);
				});
			});
		});
	}

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
		terminalFactory.GuardaTerminal(parametros).then(function(data) {
			var obj =new Object();
			terminalFactory.getSequenceId().then(function(Sequence) {
				obj.transactionSequenceId=Sequence.GetSequenceIdResult.TransactionSequenceId;
				obj.SAN="TEV"+	data.AddTerminalResult;
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
				alert(JSON.stringify(obj));
			});

			ngNotify.set('La terminal se ha guardado correctamente', 'success');
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
			'clave': 'A',
			'Nombre': 'Activo'
		},
		{
			'clave': 'S',
			'Nombre': 'Supendido'
		},
		{
			'clave': 'B',
			'Nombre': 'Baja'
		},
		{
			'clave': 'C',
			'Nombre': 'Cancelado'
		}
	];
}
