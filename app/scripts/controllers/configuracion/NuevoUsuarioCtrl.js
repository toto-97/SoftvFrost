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
	vm.existe = existe;
	vm.isDuplicate = false;

	this.$onInit = function () {
		rolFactory.GetRoleList().then(function (data) {
			vm.Roles = data.GetRoleListResult;

		});
	};

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
				usuarioFactory.AddUsuario(obj).then(function (data) {
					$state.go('home.provision.usuarios');
					ngNotify.set('Usuario agregado correctamente.', 'success');
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
