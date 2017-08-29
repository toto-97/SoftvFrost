'use strict';
angular
  .module('softvFrostApp')
  .controller('nuevamemoriatecnicaCtrl', function ($state, ngNotify, memoriaFactory, $localStorage, $uibModal, $filter) {
    var vm = this;
    vm.cambios = [];
    vm.cambioAparato = cambioAparato;
    vm.eliminaaparato = eliminaaparato;
    vm.guardar = guardar;
    vm.trabajos = [{
        'Nombre': 'Instalación'

      },
      {
        'Nombre': 'Instalación Demo/Piloto'
      },
      {
        'Nombre': 'Apuntamiento'
      },
      {
        'Nombre': 'Reubicación'
      },
      {
        'Nombre': 'Cambio de componentes'
      },
      {
        'Nombre': 'Mantenimiento'
      },
      {
        'Nombre': 'Site Survey'
      },
    ];
    initialData();



    function initialData() {

    }

    function eliminaaparato() {

    }

    function cambioAparato() {

      if ((vm.serieanterior !== '' && vm.serieanterior !== undefined) &&
        (vm.equiposurtir !== '' && vm.equiposurtir !== undefined) &&
        (vm.serienueva !== '' && vm.serienueva !== undefined)) {
        var obj = {};
        obj.serieanterior = vm.serieanterior;
        obj.equiposurtir = vm.equiposurtir;
        obj.serienueva = vm.serienueva;
        vm.cambios.push(obj);
        vm.serieanterior = '';
        vm.equiposurtir = '';
        vm.serienueva = '';

      } else {
        ngNotify.set('Necesita completar todos los campos', 'error');
      }



    }

    function ischecked(valor) {
      var cant = 0;
      vm.trabajos.forEach(function (item) {
        if (item.Nombre === valor) {
          cant += (item.selected === true) ? 1 : 0;
        }
      });
      return (cant > 0) ? true : false;
    }

    function isvalid(value) {
      return (value !== undefined && value !== '' && value !== null) ? true : false;
    }


    function guardar() {

      var obj = {
        'SAN': (isvalid(vm.siteid) === true) ? vm.siteid : 0,
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
        'Instalacion': ischecked('Instalación'),
        'InstalacionDemo': ischecked('Instalación Demo/Piloto'),
        'Apuntamiento': ischecked('Apuntamiento'),
        'Reubicacion': ischecked('Reubicación'),
        'CambioComponentes': ischecked('Cambio de componentes'),
        'Mantenimiento': ischecked('Mantenimiento'),
        'SiteSurvey': ischecked('Site Survey'),
        'Detalles': (isvalid(vm.detalleinstalacion) === true) ? vm.detalleinstalacion : '',
        'Folio': (isvalid(vm.folio) === true) ? vm.folio : 0,
        'Clv_Orden': (isvalid(vm.numeroOrden) === true) ? vm.numeroOrden : 0,
        'IdUsuario': $localStorage.currentUser.idUsuario,

      };

      console.log(obj);
      memoriaFactory.GuardaMemoriaTecnica(obj).then(function (response) {

        vm.IdMemoriaTecnica = response.GetGuardaMemoriaTecnicaListResult[0].IdMemoriaTecnica;

        var Parametros = {
          'IdMemoriaTecnica': vm.IdMemoriaTecnica,
          'Equipo': vm.cambios[0].equiposurtir,
          'SerieAnterior': vm.cambios[0].serieanterior,
          'SerieNueva': vm.cambios[0].serienueva

        };

        memoriaFactory.GuardaEquiposSustituir(Parametros).then(function (data) {
          ngNotify.set('La memoria técnica se ha guardado correctamente ', 'success');
        });

      });

    }




  });
