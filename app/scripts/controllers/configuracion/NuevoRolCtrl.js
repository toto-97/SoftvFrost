'use strict';
angular.module('softvFrostApp').controller('NuevoRolCtrl', NuevoRolCtrl);

function NuevoRolCtrl(usuarioFactory, rolFactory, $state, ngNotify,terminalFactory) {

  /// Busca hacer la conexion con el factory
  function init() {
  terminalFactory.getComandoList().then(function(data){  
      vm.comandos=data.GetComandoListResult;
    });
  };

  /// Guarda el rol y envia un mensaje de exito
  function GuardarRol() {
    var obj = {};
    obj.Nombre = vm.Nombre;
    obj.Descripcion = vm.Descripcion;
    obj.Estado = vm.Estatus;     
    rolFactory.AddRole(obj).then(function(data) {
      vm.IdRol=data.AddRoleResult;
       var Lista_comandos = [];
      for (var a = 0; a < vm.comandos.length; a++) {
        if (vm.comandos[a].selected == true) {
          Lista_comandos.push({
            'Comando': vm.comandos[a].IdComando
          })
        }
      }     
      rolFactory.GetComandos(vm.IdRol, Lista_comandos).then(function (response) {       
        $state.go('home.provision.roles');
      ngNotify.set('Rol agregado correctamente.', 'success');
      });



      
    });
  }
  var vm = this;
  init();
  vm.Estatus = false;
  vm.GuardarRol = GuardarRol;
  vm.titulo = 'Nuevo Rol';
}
