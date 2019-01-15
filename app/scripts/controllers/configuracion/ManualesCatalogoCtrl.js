'use strict';
angular.module('softvFrostApp').controller('ManualesCatalogoCtrl', ManualesCatalogoCtrl);

function ManualesCatalogoCtrl(catalogosMemoriaFactory, $state, ngNotify, FileUploader, $filter) {

  var vm = this;
  Init();
  vm.EliminaManual = EliminaManual;
  vm.Guardar = Guardar;

  function Init() {
    vm.ManualesEliminar = [];
    catalogosMemoriaFactory.GetObtieneManuales().then(function (data) {
      vm.Manuales = data.GetObtieneManualesResult;
    });
  }

  vm.uploader = new FileUploader({
    filters: [{
      name: "yourName1", fn: function (item) {
        var count = 0;
        vm.Manuales.forEach(function (f) {
          count += f.Nombre === item.name ? 1 : 0;
        });
        if (vm.DescripcionNuevo == undefined || vm.DescripcionNuevo == '') {
          ngNotify.set("Es necesario ingresar una descripción para el manual", "warn");
          return false;
        }
        if (count > 0) {
          ngNotify.set("Un archivo con ese mismo nombre ya fue seleccionado", "warn");
          return false;
        }
        else {
          return true;
        }
      }
    },
    ]
  });

  vm.uploader.onAfterAddingFile = function (fileItem) {
    fileItem.file.Descripcion = vm.DescripcionNuevo;
    fileItem._file.Descripcion = vm.DescripcionNuevo;
    var ManualAux = {};
    ManualAux.Nombre = fileItem.file.name;
    ManualAux.Descripcion = vm.DescripcionNuevo;
    ManualAux.Activo = true;
    ManualAux.IdManual = 0;
    vm.Manuales.push(ManualAux);
    vm.DescripcionNuevo = '';
    ngNotify.set("Manual agregado exitosamente", "info");
  };


  function EliminaManual(Manual) {
    var indexEliminar = 0
    vm.Manuales.forEach(function (item, index) {
      if (item.Nombre == Manual.Nombre) {
        indexEliminar = index;
        if (item.IdManual > 0) {
          vm.ManualesEliminar.push(item);
        }
      }
    });
    vm.Manuales.splice(indexEliminar, 1);

    vm.uploader.queue.forEach(function (f, index) {
      if(f._file.name == Manual.Nombre){
        indexEliminar = index;
      }
    });
    vm.uploader.queue.splice(indexEliminar, 1);
  }

  function Guardar() {
    var file_options = [];
    var files = [];
    //Imagenes generales
    vm.uploader.queue.forEach(function (f) {

      var options = {
        IdManual: 0,
        Nombre: f._file.name,
        Descripcion: f._file.Descripcion
      };
      file_options.push(options);
      files.push(f._file);

    });

    catalogosMemoriaFactory.GetGuardaManuales(files, vm.Manuales, file_options, vm.ManualesEliminar).then(function (data) {
      ngNotify.set("Los manuales se han guardado correctamente", "success");
      vm.uploader.clearQueue();
    });
    /*
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
    });*/
  }


}
