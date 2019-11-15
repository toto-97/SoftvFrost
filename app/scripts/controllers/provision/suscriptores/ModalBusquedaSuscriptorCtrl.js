'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalBusquedaSuscriptorCtrl', function($uibModalInstance, $uibModal, SuscriptorFactory, $rootScope,$localStorage) {

		/// Obtiene una lista de los suscriptores
		function initialData() {
			SuscriptorFactory.getSuscriptorList().then(function(data) {
				vm.suscriptores = data.GetSuscriptorListResult;
			});
		}

		/// No se usa
		function ok() {

		}

		/// Valida el cliente seleccionado
		function SeleccionarSusc(x) {

			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit('cliente_seleccionado', x);

		}

		/// Busca un clinete por su id
		function cambiarBusqueda(id) {
			vm.tipoBusqueda = 0;
			if (id == 1) {
				if (vm.bsan == '') {
					vm.tipoBusqueda = 0;
				} else {
					vm.bnombre = ''
					vm.tipoBusqueda = 1;
				}
			} else {
				if (vm.bnombre == '') {
					vm.tipoBusqueda = 0;
				} else {
					vm.bsan = '';
					vm.tipoBusqueda = 2;
				}
			}
		}

		/// Busca un suscriptor en especial
		function buscar() {
			if (vm.tipoBusqueda == 1) {
				vm.busObj = {
					'IdSuscriptor': vm.bsan,
					'Nombre': '',
					'Apellido': '',
					'Telefono': '',
					'Email': '',
					'Calle': '',
					'Numero': '',
					'Colonia': '',
					'Ciudad': '',
					'Op': 1,
					'IdUsuario':$localStorage.currentUser.idUsuario
				};
			} else if (vm.tipoBusqueda == 2) {
				vm.busObj = {
					'IdSuscriptor': 0,
					'Nombre': vm.bnombre,
					'Apellido': '',
					'Telefono': '',
					'Email': '',
					'Calle': '',
					'Numero': '',
					'Colonia': '',
					'Ciudad': '',
					'Op': 2,
					'IdUsuario':$localStorage.currentUser.idUsuario
				};
			}
			if (vm.tipoBusqueda == undefined || vm.tipoBusqueda == 0) {
				SuscriptorFactory.getSuscriptorList().then(function(data) {
					vm.suscriptores = data.GetSuscriptorListResult;
					$('.buscarSuscriptor').collapse('hide');
				});
			} else {
				SuscriptorFactory.buscarSuscriptor(vm.busObj).then(function(data) {
					vm.suscriptores = data.GetFilterSuscriptorListResult;
					$('.buscarSuscriptor').collapse('hide');
				});
			}
		}

		/// Cacela la operacion de busqueda
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
		vm.SeleccionarSusc = SeleccionarSusc;
		vm.cambiarBusqueda = cambiarBusqueda;
		vm.buscar = buscar;
	})
