

'use strict';
angular.module('softvFrostApp').controller('EditaTerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory, $uibModal, $rootScope, ngNotify,$stateParams,$state) {
	this.$onInit = function() {
		terminalFactory.getServicioList().then(function(data) {
			vm.Servicios = data.GetServicioListResult;
    terminalFactory.getTerminalById($stateParams.Id).then(function(data){
    var sus= data.GetByTerminalResult;


    });
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
		console.log(detalle.IdSuscriptor);
		vm.IdSuscriptor = detalle.IdSuscriptor;
		vm.NombreSuscriptor = detalle.Nombre + detalle.Apellido;
	});

	$rootScope.$on('get_LatLong', function(e, detalle) {
		vm.Latitud = detalle[0];
		vm.Longuitud = detalle[1];
	});

	function EditaTerminal() {
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
		console.log(parametros);



		terminalFactory.GuardaTerminal(parametros).then(function(data) {
			console.log(data);
			ngNotify.set('La terminal se ha guardado correctamente', 'grimace');
		});
	}




	var vm = this;
	vm.titulo = "Edita Terminal";
	vm.BuscaSuscriptor = BuscaSuscriptor;
	vm.BuscaLatLong = BuscaLatLong;
	vm.GuardaTerminal = EditaTerminal;
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
