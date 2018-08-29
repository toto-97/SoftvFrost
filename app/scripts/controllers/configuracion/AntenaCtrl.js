'use strict';
angular.module('softvFrostApp').controller('AntenaCtrl', AntenaCtrl);

function AntenaCtrl(catalogosMemoriaFactory, $state, ngNotify) {

  function Init() {
    vm.AntenasEliminar = [];
    catalogosMemoriaFactory.GetObtieneAntenasCatalogo().then(function (data) {
      vm.Antenas = data.GetObtieneAntenasCatalogoResult;
    });
  }

  function Agregar() {
    var tipoAux = {};
    var Agrega = true;
    vm.Antenas.forEach(function (item, index) {
      if (item.Nombre == vm.NombreNuevo) {
        ngNotify.set('Ya existe una antena con el mismo nombre', 'warn');
        Agrega = false;
      }
    });
    if (Agrega == true) {
      tipoAux.Nombre = vm.NombreNuevo;
      tipoAux.Activo = true;
      tipoAux.IdAntena = 0;
      tipoAux.ExisteAntena = false;
      vm.Antenas.push(tipoAux);
      vm.NombreNuevo = '';
    }
  }

  function ElimnarTipo(Antena) {
    if (Antena.IdTipo > 0 && Antena.ExisteAntena == true) {
      ngNotify.set('Ya se ha guardado una memoria técnica con esta Antena, no se puede eliminar', 'warn');
    }
    else {
      var indexEliminar = 0
      vm.Antenas.forEach(function (item, index) {
        if (item.IdAntena == Antena.IdAntena && item.Nombre == Antena.Nombre) {
          indexEliminar = index;
          if (item.IdAntena > 0) {
            vm.AntenasEliminar.push(item.IdAntena);
          }
        }
      });
      vm.Antenas.splice(indexEliminar, 1);
    }
  }

  function Guardar() {
    var parametros = {};
    parametros.Antenas = vm.Antenas;
    catalogosMemoriaFactory.GetGuardaAntenas(parametros).then(function (data) {
      if (vm.AntenasEliminar.length > 0) {
        var parametrosEliminar = {};
        parametrosEliminar.IdAntenas = vm.AntenasEliminar;
        catalogosMemoriaFactory.GetEliminaAntena(parametrosEliminar).then(function (data) {
          catalogosMemoriaFactory.GetObtieneAntenasCatalogo().then(function (data) {
            vm.Antenas = data.GetObtieneAntenasCatalogoResult;
            ngNotify.set('Antenas actualizadas exitosamente', 'success');
            vm.AntenasEliminar = [];
          });
        });
      }
      else {
        catalogosMemoriaFactory.GetObtieneAntenasCatalogo().then(function (data) {
          vm.Antenas = data.GetObtieneAntenasCatalogoResult;
          ngNotify.set('Antenas actualizadas exitosamente', 'success');
        });
      }
    });
  }

  var vm = this;
  Init();
  vm.Agregar = Agregar;
  vm.ElimnarTipo = ElimnarTipo;
  vm.Guardar = Guardar;
}
