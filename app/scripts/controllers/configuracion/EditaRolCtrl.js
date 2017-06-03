'use strict';
angular.module('softvFrostApp').controller('EditaRolCtrl', EditaRolCtrl);

function EditaRolCtrl(usuarioFactory, rolFactory, $state, ngNotify, $stateParams, terminalFactory) {

  function init() {
    var id = $stateParams.id;
    rolFactory.GetRoleById(id).then(function (data) {
      vm.Rol = data.GetRoleByIdResult
      vm.Estatus = vm.Rol.Estado;
      vm.Nombre = vm.Rol.Nombre;
      vm.Descripcion = vm.Rol.Descripcion;
      vm.IdRol = vm.Rol.IdRol;
    });

    terminalFactory.getComandoList().then(function (data) {     
      vm.comandos = data.GetComandoListResult;
      rolFactory.GetRoleCommands(vm.IdRol).then(function (data) {
        for (var a = 0; a < vm.comandos.length; a++) {
          for (var b = 0; b < data.GetRoleCommandsResult.length; b++) {
            if (vm.comandos[a].IdComando == data.GetRoleCommandsResult[b].IdComando) {
              vm.comandos[a].selected = true;
            }
          }
        }        
      });
    });
  };

  function GuardarRol() {
    var obj = {};

    obj.IdRol = vm.IdRol
    obj.Nombre = vm.Nombre;
    obj.Descripcion = vm.Descripcion;
    obj.Estado = vm.Estatus;
    rolFactory.UpdateRole(obj).then(function (data) {

      var Lista_comandos = [];
      for (var a = 0; a < vm.comandos.length; a++) {
        if (vm.comandos[a].selected == true) {
          Lista_comandos.push({
            'Comando': vm.comandos[a].IdComando
          })
        }
      }
      console.log(Lista_comandos);
      rolFactory.GetComandos(vm.IdRol, Lista_comandos).then(function (response) {
        console.log(response);
      });

      $state.go('home.provision.roles');
      ngNotify.set('Rol editado correctamente.', 'success');
    });
  }
  var vm = this;
  vm.titulo = 'Edita Rol';
  init();
  vm.GuardarRol = GuardarRol;
}
