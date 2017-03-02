'use strict';
angular.module('softvFrostApp').controller('PermisosCtrl', PermisosCtrl);

function PermisosCtrl(permisoFactory, rolFactory) {
  function Init() {
    rolFactory.GetRoleList().then(function(data) {
      vm.Roles = data.GetRoleListResult;
      vm.Rol = vm.Roles[0];
      GetModuleList();
    });
  }

  function GetModuleList() {
    permisoFactory.GetModuleList().then(function(data) {
      var modulos = data.GetModuleListResult;
      console.log(data);
      permisoFactory.GetPermisoList(vm.Rol.IdRol).then(function(data) {
        var permisos = data.GetPermisoRolListResult;
        console.log(data.GetPermisoRolListResult);
        vm.Modules = MergePermisos(modulos, permisos);
      });
    });
  }

  function MergePermisos(modulos, permisos) {
    for (var a = 0; a < modulos.length; a++) {
      for (var b = 0; b < permisos.length; b++) {
        if (modulos[a].IdModule == permisos[b].IdModule) {
          modulos[a].OptAdd = permisos[b].OptAdd;
          modulos[a].OptDelete = permisos[b].OptDelete;
          modulos[a].OptUpdate = permisos[b].OptUpdate;
          modulos[a].OptSelect = permisos[b].OptSelect;

        }
      }

    }
    return modulos;
  }

  function ObtenPermisos() {
    GetModuleList();
  }


  var vm = this;
  Init();
  vm.ObtenPermisos = ObtenPermisos;
}
