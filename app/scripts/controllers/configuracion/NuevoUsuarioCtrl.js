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
	vm.getplazas=getplazas;
	vm.getTecnicosDisponibles=getTecnicosDisponibles;
	vm.guardaRelacion=guardaRelacion;
	vm.Id=0;

	this.$onInit = function () {
		rolFactory.GetRoleList().then(function (data) {
			vm.Roles = data.GetRoleListResult;
			usuarioFactory.GetDistribuidores().then(function (data) {
				console.log(data);
				vm.Distribuidores = data.GetDistribuidoresResult;
			});
		});
	};

	function getTecnicosDisponibles(){
		usuarioFactory.GetObtieneTecnicosLibres(vm.Id,vm.plaza.Clave,vm.distribuidor.Clave).then(function (data) {
			console.log(data);
			vm.tecnicoslibres = data.GetObtieneTecnicosLibresResult;
		});
	}

	function getplazas(){
		usuarioFactory.GetPlazas(vm.distribuidor.Clave).then(function (data) {
			console.log(data);
			vm.Plazas = data.GetPlazasResult;
		});
	}

	function getUsuariostecnicos(){
		usuarioFactory.GetObtieneTecnicosUsuario(vm.Id).then(function (data) {
			console.log(data);			
			vm.tecnicosUsuario = data.GetObtieneTecnicosUsuarioResult;
		});

	}

	function guardaRelacion(){
		var tecnicos=[];
		var tec={
			'IdEntidad':vm.tecnicolibre.IdEntidad,
			'Nombre':vm.tecnicolibre.Nombre,
			'Accion':1
		}
		tecnicos.push(tec);
		usuarioFactory.GetGuardaRelacionUsuarioTecnico(vm.Id,tecnicos).then(function(result){
			getUsuariostecnicos();
         console.log(result);
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
				obj.RecibeMensaje=vm.RecibeMensaje;
				obj.CheckMemoria=vm.CheckMemoria;
				usuarioFactory.AddUsuario(obj).then(function (data) {
				vm.Id=data.AddUsuarioResult;
				getUsuariostecnicos();
					console.log(data);
					//$state.go('home.provision.usuarios');
					ngNotify.set('Usuario agregado correctamente.\n ahora puedes agregar relación técnico-usuario', 'success');
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
