'use strict';
angular.module('softvFrostApp').controller('UsuariosCtrl', UsuariosCtrl);

function UsuariosCtrl(usuarioFactory){

function Init(){
  usuarioFactory.getUsuarioList().then(function(data){
    vm.Usuarios=data.GetUsuarioListResult;
  });
}

  var vm=this;
  Init();
}
