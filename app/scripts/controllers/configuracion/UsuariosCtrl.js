'use strict';
angular.module('softvFrostApp').controller('UsuariosCtrl', UsuariosCtrl);

function UsuariosCtrl(usuarioFactory){

function Init(){
  usuarioFactory.getUsuarioList().then(function(data){
    vm.Usuarios=data.GetUsuarioListResult;
  });
}

function AddUsuario(){
  
}

  var vm=this;
  Init();
  vm.AddUsuario=AddUsuario;
}
