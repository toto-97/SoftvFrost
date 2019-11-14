'use strict';
angular
	.module('softvFrostApp')
	.controller('ModalBuscaClienteCtrl', function ($uibModalInstance, $uibModal, atencionFactory, $rootScope, ngNotify, $localStorage, options) {

		/// Carga la informacion de los clientes
		function initialData() {
			var obje = {};
			obje.servicio = options.CLV_TIPSER;
			obje.op = 3;
			obje.colonia = 0;
			atencionFactory.buscarCliente(obje).then(function (data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
				if (vm.Clientes.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
			});
		}

		/// Busca un contrato
		function BusquedaporContrato() {
			if (!(/^\d{1,9}-\d{1,9}$/.test(vm.BUcontrato))) {
			
				ngNotify.set('El número de contrato está formado por 2 grupos de números con un guion intermedio p.e. (1234-1)', 'primary');
			} else {
				var obje = {};
				obje.contrato = vm.BUcontrato;
				obje.servicio = options.CLV_TIPSER;
				obje.colonia = 0;
				obje.op = 0;
				atencionFactory.buscarCliente(obje).then(function (data) {
					vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
					if (vm.Clientes.length == 0) {
						vm.sinRegistros = true;
						vm.conRegistros = false;
					} else {
						vm.sinRegistros = false;
						vm.conRegistros = true;
					}
				});
			}
		}

		/// Busca un clinte con un nombre en especifico
		function BusquedaporNombre() {
			var obje = {};
			obje.nombre = vm.BUnombre;
			obje.paterno = vm.BUapaterno;
			obje.materno = vm.BUamaterno;
			obje.colonia = 0;
			obje.servicio = options.CLV_TIPSER;
			obje.op = 1;
			atencionFactory.buscarCliente(obje).then(function (data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
				if (vm.Clientes.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
			});
		}

		/// Busca un clinte con una direccion en especifico
		function BusquedaporDireccion() {
			var obje = {};
			obje.servicio = options.CLV_TIPSER;
			obje.calle = vm.BUcalle;
			obje.numero = vm.BUnumero;
			obje.colonia = 0;
			//obje.colonia
			obje.op = 2;
			atencionFactory.buscarCliente(obje).then(function (data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
				if (vm.Clientes.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
			});
		}

		/// Busca un clinte con un aparato en especifico
		function BusquedaporAparato() {
			var obje = {};
			obje.servicio = options.CLV_TIPSER;
			obje.setupbox = vm.BUaparato;
			obje.op = 5;
			obje.colonia = 0;
			atencionFactory.buscarCliente(obje).then(function (data) {
				vm.Clientes = data.GetuspBuscaContratoSeparado2ListResult;
				if (vm.Clientes.length == 0) {
					vm.sinRegistros = true;
					vm.conRegistros = false;
				} else {
					vm.sinRegistros = false;
					vm.conRegistros = true;
				}
			});
		}

		/// Verifica el cliente seleccionado por el usuario
		function Seleccionar(cliente) {
			$uibModalInstance.dismiss('cancel');
			$rootScope.$emit('cliente_seleccionado', cliente);
		}

		/// Cancela la operacion
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.Seleccionar = Seleccionar;
		initialData();
		vm.BusquedaporNombre = BusquedaporNombre;
		vm.BusquedaporDireccion = BusquedaporDireccion;
		vm.BusquedaporAparato = BusquedaporAparato;
		vm.BusquedaporContrato = BusquedaporContrato;
	});
