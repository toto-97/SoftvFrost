'use strict';
angular.module('softvFrostApp').controller('EditaUsuarioCtrl', EditaUsuarioCtrl);

function EditaUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify, $stateParams) {
  var vm = this;
  vm.titulo = 'Edita Usuario';
  vm.passwordPanel = false;
  vm.ValidatePanel = true;
  vm.editar = false;
  vm.ValidaPass = ValidaPass;
  vm.GuardarUsuario = GuardarUsuario;
  vm.eliminaRelacion = eliminaRelacion;
  vm.guardaRelacion = guardaRelacion;
  vm.userText = true;
  vm.getplazas = getplazas;
  vm.getTecnicosDisponibles = getTecnicosDisponibles;
  vm.guardaRelacion = guardaRelacion;
  vm.eliminaRelacion = eliminaRelacion;
  vm.btnsubmit = true;


  this.$onInit = function () {
    var userid = $stateParams.id;
    usuarioFactory.GetDistribuidores().then(function (data) {
      vm.Distribuidores = data.GetDistribuidoresResult;
      usuarioFactory.GetUserDetail(userid).then(function (data) {
        var user = data.GetUserListbyIdUserResult[0];
        vm.Id = user.IdUsuario;
        rolFactory.GetRoleList().then(function (data) {
          vm.Roles = data.GetRoleListResult;
          for (var a = 0; a < vm.Roles.length; a++) {
            if (vm.Roles[a].IdRol == user.IdRol) {
              vm.Rol = vm.Roles[a];
            }
          }
          vm.Nombre = user.Nombre;
          vm.Correo = user.Email;
          vm.Descripcion = user.Usuario;
          vm.Password = user.Password;
          vm.Contrasena = user.Password;
          vm.RecibeMensaje = (user.RecibeMensaje === null) ? false : user.RecibeMensaje;
          vm.CheckMemoria = (user.CheckMemoria === null) ? false : user.CheckMemoria;
          getUsuariostecnicos();
        });
      });
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


  function GuardarUsuario() {
    if (vm.editar) {
      if (vm.Contrasena === vm.Contrasena2) {
        var obj = {};
        obj.IdUsuario = vm.Id;
        obj.IdRol = vm.Rol.IdRol;
        obj.Nombre = vm.Nombre;
        obj.Email = vm.Correo;
        obj.Usuario = vm.Descripcion;
        obj.Password = vm.Contrasena;
        obj.RecibeMensaje = vm.RecibeMensaje;
        obj.CheckMemoria = vm.CheckMemoria;
        usuarioFactory.UpdateUsuario(obj).then(function (data) {
          $state.go('home.provision.usuarios');
          ngNotify.set('Usuario editado correctamente.', 'success');
        });
      } else {
        ngNotify.set('Las contraseña no coinciden.', 'error');
      }
    } else {
      var obj = {};
      obj.IdUsuario = vm.Id;
      obj.IdRol = vm.Rol.IdRol;
      obj.Nombre = vm.Nombre;
      obj.Email = vm.Correo;
      obj.Usuario = vm.Descripcion;
      obj.Password = vm.Contrasena;
      obj.RecibeMensaje = vm.RecibeMensaje;
      obj.CheckMemoria = vm.CheckMemoria;
      usuarioFactory.UpdateUsuario(obj).then(function (data) {
        $state.go('home.provision.usuarios');
        ngNotify.set('Usuario editado correctamente.', 'success');
      });
    }


  }

  function ValidaPass() {
    if (vm.PassValidate === vm.Password) {
      vm.editar = true;
      vm.Contrasena = '';
      vm.ValidatePanel = false;
      vm.passwordPanel = true;
    } else {
      ngNotify.set('Contraseña no es  válida', 'error');
    }
  }
}
