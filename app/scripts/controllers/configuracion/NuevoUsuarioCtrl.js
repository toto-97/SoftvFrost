'use strict';
angular.module('softvFrostApp').controller('NuevoUsuarioCtrl', NuevoUsuarioCtrl);

function NuevoUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify) {

  function init() {
    rolFactory.GetRoleList().then(function(data) {
      vm.Roles = data.GetRoleListResult;
      console.log(data);
    });
  };

  function GuardarUsuario() {
    var obj = {};
    obj.IdRol = vm.Rol.IdRol;
    obj.Nombre = vm.Nombre;
    obj.Email = vm.Correo;
    obj.Usuario = vm.Descripcion;
    obj.Password = vm.Contrasena;
    console.log(obj);


    usuarioFactory.AddUsuario(obj).then(function(data) {
      $state.go('home.provision.usuarios');
      ngNotify.set('Usuario agregado correctamente.', 'success');
    });
  }


  var vm = this;
  init();
  vm.GuardarUsuario = GuardarUsuario;
}
