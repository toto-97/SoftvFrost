'use strict';
angular.module('softvFrostApp').controller('NuevoUsuarioCtrl', NuevoUsuarioCtrl);

function NuevoUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify) {
	var vm = this;
	vm.GuardarUsuario = GuardarUsuario;
	vm.titulo = 'Nuevo Usuario';
	vm.passwordPanel = true;
	vm.ValidatePanel = false;
	vm.editar = true;
	vm.userText = false;
	vm.LUITerminal = false;
	vm.existe = existe;
	vm.isDuplicate = false;
	vm.getplazas = getplazas;
	vm.getTecnicosDisponibles = getTecnicosDisponibles;
	vm.guardaRelacion = guardaRelacion;
	vm.eliminaRelacion = eliminaRelacion;
	vm.getplazasClienteDisp = getplazasClienteDisp;
	vm.guardaRelacionCliente = guardaRelacionCliente;
	vm.eliminaRelacionCliente = eliminaRelacionCliente;
	vm.btnsubmit = true;
	vm.Id = 0;
	vm.Activo = true;
	vm.RolSupervidor = false;
	this.$onInit = function () {
		rolFactory.GetRoleList().then(function (data) {
			vm.Roles = data.GetRoleListResult;
			usuarioFactory.GetDistribuidores().then(function (data) {
				vm.Distribuidores = data.GetDistribuidoresResult;
			});
		});
	};

	function getTecnicosDisponibles() {
		usuarioFactory.GetObtieneTecnicosLibres(vm.Id, vm.plaza.Clave, vm.distribuidor.Clave).then(function (data) {
			vm.tecnicoslibres = data.GetObtieneTecnicosLibresResult;
		});
	}

	function getplazas() {
		usuarioFactory.GetPlazas(vm.distribuidor.Clave).then(function (data) {
			vm.Plazas = data.GetPlazasResult;
		});
	}

	function getUsuariostecnicos() {
		usuarioFactory.GetObtieneTecnicosUsuario(vm.Id).then(function (data) {
			vm.tecnicosUsuario = data.GetObtieneTecnicosUsuarioResult;
		});

	}
	function getplazasClienteDisp() {
		usuarioFactory.GetObtieneCompaniasLibres(vm.Id, vm.distribuidorcliente.Clave).then(function (data) {
			vm.PlazasClienteDis = data.GetObtieneCompaniasLibresResult;
		});
	}

	function GetObtieneCompaniasUsuario() {
		usuarioFactory.GetObtieneCompaniasUsuario(vm.Id).then(function (result) {
			vm.relacionCliente = result.GetObtieneCompaniasUsuarioResult;
		});
	}

	function guardaRelacionCliente() {
		var arr = [];
		arr.push({
			'IdCompania': vm.plazaCliente.IdCompania,
			'Accion': 1
		})
		usuarioFactory.GetGuardaRelacionUsuarioCompania(vm.Id, arr).then(function (result) {
			ngNotify.set('La relación Usuario-Plaza se ha guardado correctamente');
			getplazasClienteDisp();
			GetObtieneCompaniasUsuario();
		});
	}

	function eliminaRelacionCliente(x) {
		var arr = [];
		arr.push({
			'IdCompania': x.IdCompania,
			'Accion': 2
		})
		usuarioFactory.GetGuardaRelacionUsuarioCompania(vm.Id, arr).then(function (result) {
			ngNotify.set('La relación Usuario-Plaza se ha guardado correctamente');
			getplazasClienteDisp();
			GetObtieneCompaniasUsuario();
		});
	}


	function eliminaRelacion(item) {
		var tecnicos = [];
		var tec = {
			'IdEntidad': item.IdEntidad,
			'Nombre': item.Nombre,
			'Accion': 2
		}
		tecnicos.push(tec);
		usuarioFactory.GetGuardaRelacionUsuarioTecnico(vm.Id, tecnicos).then(function (result) {
			getUsuariostecnicos();
		});
	}



	function guardaRelacion() {
		var tecnicos = [];
		var tec = {
			'IdEntidad': vm.tecnicolibre.IdEntidad,
			'Nombre': vm.tecnicolibre.Nombre,
			'Accion': 1
		}
		tecnicos.push(tec);
		usuarioFactory.GetGuardaRelacionUsuarioTecnico(vm.Id, tecnicos).then(function (result) {
			getUsuariostecnicos();

		});
	}

	function GuardarUsuario() {
		if (vm.isDuplicate) {
			ngNotify.set('Por favor introduce un nombre de usuario válido.', 'error');
		} else {
			if (vm.Contrasena === vm.Contrasena2) {
				var obj = {};
				obj.IdRol = vm.Rol.IdRol;
				obj.Nombre = vm.Nombre;
				obj.Email = vm.Correo;
				obj.Usuario = vm.Descripcion;
				obj.Password = vm.Contrasena;
				obj.RecibeMensaje = vm.RecibeMensaje;
				obj.CheckMemoria = vm.CheckMemoria;
				obj.Cliente = vm.Cliente;
				obj.Estado = vm.Activo;
				obj.LUITerminal = vm.LUITerminal;
				usuarioFactory.AddUsuario(obj).then(function (data) {
					vm.Id = data.AddUsuarioResult;
					vm.btnsubmit = false;
					if (globalService.IdSupervisorInstalador() == vm.Rol.IdRol) {
						vm.RolSupervidor = true;
						GetObtieneInstaladoresSupervisor();
						usuarioFactory.getUsuarioList().then(function (data) {
							var Usuarios = data.GetUsuarioListResult;
							vm.Instaladores = [];
							Usuarios.forEach(function (item) {
								if (item.IdRol == 4 && item.Estado) {
									vm.Instaladores.push(item);
								}
							});
						});
					}
					if (vm.Cliente) {
						ngNotify.set('Usuario agregado correctamente.\n ahora puedes agregar relación de plazas y usuarios', 'success');
					} else {
						getUsuariostecnicos();
						ngNotify.set('Usuario agregado correctamente.\n ahora puedes agregar relación técnico-usuario', 'success');

					}
				});
			} else {
				ngNotify.set('Las contraseña no coinciden.', 'error');
			}
		}
	}

	function existe() {
		usuarioFactory.existeUsuario(vm.Descripcion).then(function (data) {
			if (data.GetExisteUserResult.Bnd == 1) {
				vm.isDuplicate = true;
			} else {
				vm.isDuplicate = false;
			}
		});
	}

}
