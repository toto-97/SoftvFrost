'use strict';
angular
  .module('softvFrostApp')  
  .controller('nuevamemoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory, $localStorage, $uibModal, $filter, FileUploader) {
    var vm = this;
    vm.cambios = [];
    vm.cambios_eliminados = [];
    vm.cambioAparato = cambioAparato;
    vm.eliminaaparato = eliminaaparato;
    vm.guardar = guardar;
    vm.BorraImagen = BorraImagen;
    vm.showguardar = true;
    vm.seleccionImagen = true;
    vm.detalle = false;
    vm.titulo = 'Registro de memoria técnica';
    vm.uploader = new FileUploader({
      filters: [{
          name: 'yourName1',
          fn: function (item) {
            var count = 0;
            vm.uploader.queue.forEach(function (f) {
              count += (f._file.name === item.name) ? 1 : 0;
            });
            if (count > 0) {
              ngNotify.set('Un archivo con ese mismo nombre ya fue seleccionado', 'warn')
              return false;
            } else {
              return true;
            }
          }
        },



      ]
    });


    initialData();

    vm.uploader.onAfterAddingFile = function (fileItem) {
      fileItem.file.idtipo = vm.tipoimagen.IdTipo;
      fileItem.file.tipo = vm.tipoimagen.Nombre;
      fileItem._file.idtipo = vm.tipoimagen.IdTipo;
      fileItem._file.tipo = vm.tipoimagen.Nombre;
    };

    function initialData() {
      memoriaFactory.ObtieneTiposImagenes().then(function (response) {
        vm.tiposresp = response.GetObtieneTiposImagenesListResult;
      });
    }

    function BorraImagen(index) {
      if (index > -1) {
        vm.cambios.splice(index, 1);
      }
    }

    function eliminaaparato(index) {
      if (index > -1) {       
        vm.cambios.splice(index, 1);
      }

    }



    function cambioAparato() {

      if ((vm.serieanterior !== '' && vm.serieanterior !== undefined) &&
        (vm.equiposurtir !== '' && vm.equiposurtir !== undefined) &&
        (vm.serienueva !== '' && vm.serienueva !== undefined)) {

        if (vm.serienueva !== vm.serieanterior) {
          var obj = {};
          obj.SerieAnterior = vm.serieanterior;
          obj.Equipo = vm.equiposurtir;
          obj.SerieNueva = vm.serienueva;
          obj.Opcion = 1;          
          vm.cambios.push(obj);
          vm.serieanterior = '';
          vm.equiposurtir = '';
          vm.serienueva = '';
        } else {
          ngNotify.set('Las series no pueden ser iguales', 'error');
        }

      } else {
        ngNotify.set('Necesita completar todos los campos', 'error');
      }
    }

    function isvalid(value) {
      return (value !== undefined && value !== '' && value !== null) ? true : false;
    }

    function guardar() {
      var obj = {
        'SAN': (isvalid(vm.SAN) === true) ? vm.SAN : 0,
        'Contrato': (isvalid(vm.contrato) === true) ? vm.contrato : 0,
        'Distribuidor': (isvalid(vm.distribuidor) === true) ? vm.distribuidor : '',
        'Instalador': (isvalid(vm.instalador) === true) ? vm.instalador : '',
        'FechaVisita': (isvalid(vm.fechasitio) === true) ? $filter('date')(vm.fechasitio, 'yyyy-MM-dd') : '',
        'HoraLlegada': (isvalid(vm.horallegada) === true) ? vm.horallegada : '',
        'HoraSalida': (isvalid(vm.horasalida) === true) ? vm.horasalida : '',
        'SiteId': (isvalid(vm.siteid) === true) ? vm.siteid : 0,
        'Cliente': (isvalid(vm.cliente) === true) ? vm.cliente : '',
        'Estado': (isvalid(vm.estado) === true) ? vm.estado : '',
        'Municipio': (isvalid(vm.municipio) === true) ? vm.municipio : '',
        'Localidad': (isvalid(vm.localidad) === true) ? vm.localidad : '',
        'Direccion': (isvalid(vm.direccion) === true) ? vm.direccion : '',
        'PersonaRecibe': (isvalid(vm.recibe) === true) ? vm.recibe : '',
        'Plataforma': (isvalid(vm.plataforma) === true) ? vm.plataforma : '',
        'Servicio': (isvalid(vm.plan) === true) ? vm.plan : '',
        'TipoServicio': (isvalid(vm.tiposervicio) === true) ? vm.tiposervicio : '',
        'Velocidad': (isvalid(vm.velocidad) === true) ? vm.velocidad : '',
        'DomicilioNotificacion': (isvalid(vm.domicilionotificacion) === true) ? vm.domicilionotificacion : '',
        'CodigoPostal': (isvalid(vm.codigopostal) === true) ? vm.codigopostal : '',
        'Telefono': vm.telefono,
        'Celular': vm.celular,
        'Latitud': vm.latitud,
        'Longitud': vm.longitud,
        'Beam': (isvalid(vm.beam) === true) ? vm.beam : '',
        'EstatusTecnico': (isvalid(vm.estatustecnico) === true) ? vm.estatustecnico : '',
        'FechaActivacion': (isvalid(vm.fechaactivacion) === true) ? $filter('date')(vm.fechaactivacion, 'yyyy-MM-dd') : '',
        'VCNeutroTierra': (isvalid(vm.vcneutrotierra) === true) ? vm.vcneutrotierra : '',
        'VCFaseTierra': (isvalid(vm.vcfasetierra) === true) ? vm.vcfasetierra : '',
        'VCFaseNeutro': (isvalid(vm.vcfaseneutro) === true) ? vm.vcfaseneutro : '',
        'VUPSNeutroTierra': (isvalid(vm.upcneutrotierra) === true) ? vm.upcneutrotierra : '',
        'VUPSFaseTierra': (isvalid(vm.upcfasetierra) === true) ? vm.upcfasetierra : '',
        'VUPSFaseNeutro': (isvalid(vm.upcfaseneutro) === true) ? vm.upcfaseneutro : '',
        'Modem': (isvalid(vm.modem) === true) ? vm.modem : '',
        'Antena': (isvalid(vm.tamanoantena) === true) ? vm.tamanoantena : '',
        'SQF': (isvalid(vm.sqf) === true) ? vm.sqf : '',
        'Radio': (isvalid(vm.serieradio) === true) ? vm.serieradio : '',
        'Router': (isvalid(vm.serierouter) === true) ? vm.serierouter : '',
        'MarcaRouter': (isvalid(vm.marcarouter) === true) ? vm.marcarouter : '',
        'UPS': (isvalid(vm.upsserie) === true) ? vm.upsserie : '',
        'WiFi': (isvalid(vm.wifiserie) === true) ? vm.wifiserie : '',
        'Instalacion': vm.Instalacion,
        'InstalacionDemo': vm.InstalacionDemo,
        'Apuntamiento': vm.Apuntamiento,
        'Reubicacion': vm.Reubicacion,
        'CambioComponentes': vm.CambioComponentes,
        'Mantenimiento': vm.Mantenimiento,
        'SiteSurvey': vm.SiteSurvey,
        'Detalles': (isvalid(vm.detalleinstalacion) === true) ? vm.detalleinstalacion : '',
        'Folio': (isvalid(vm.numerofolio) === true) ? vm.numerofolio : 0,
        'Clv_Orden': (isvalid(vm.numeroorden) === true) ? vm.numeroorden : 0,
        'IdUsuario': $localStorage.currentUser.idUsuario
      };

      memoriaFactory.GuardaMemoriaTecnica(obj).then(function (response) {
        vm.IdMemoriaTecnica = response.GetGuardaMemoriaTecnicaListResult[0].IdMemoriaTecnica;
        var file_options = [];
        var files = [];
        var tipos = [];
        var count = 0;
        vm.uploader.queue.forEach(function (f) {
          if (tipos.includes(f._file.idtipo)) {
            count += 1;
          } else {
            var options = {
              'IdImagen': 0,
              'Accion': 1,
              'Tipo': f._file.idtipo,
              'Nombre': f._file.name
            }
            file_options.push(options);
            tipos.push(f._file.idtipo);
            files.push(f._file);
          }

        });
        if (count > 0) {
          ngNotify.set('Existen imagenes con el mismo tipo', 'error');
          return;
        } else {
          memoriaFactory.GuardaImagenesMemoriaTecnica(files, vm.IdMemoriaTecnica, file_options).then(function (data) {
            ngNotify.set('las imagenes se han guardado correctamente', 'success');
            vm.uploader.clearQueue();
            var equipos_ = [];
            vm.cambios.forEach(function (item) {
              var equipo = {}
              equipo.IdEquipoSustituir = 0;
              equipo.IdMemoriaTecnica = vm.IdMemoriaTecnica;
              equipo.Equipo = item.Equipo;
              equipo.SerieAnterior = item.SerieAnterior;
              equipo.SerieNueva = item.SerieNueva;
              equipo.Opcion = item.Opcion;
              equipos_.push(equipo)
            });
            memoriaFactory.GuardaEquiposSustituir(equipos_).then(function (result) {
              ngNotify.set('La memoria técnica se ha guardado correctamente', 'success')
              $state.go('home.memoria.memoriastecnicas');
            });


          });
        }

      });

    }




  });
