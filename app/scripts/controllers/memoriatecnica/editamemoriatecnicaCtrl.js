'use strict';
angular
  .module('softvFrostApp')
  .controller('editamemoriatecnicaCtrl',
    function ($state, ngNotify, memoriaFactory, $localStorage, $stateParams, $filter, FileUploader, globalService, Lightbox) {



      function initialData() {

        memoriaFactory.ObtieneTiposImagenes().then(function (response) {
          vm.tiposresp = response.GetObtieneTiposImagenesListResult;
          memoriaFactory.GetObtieneMemoriaTecnica(vm.id).then(function (data) {
            detalle(data.GetObtieneMemoriaTecnicaResult[0]);
            memoriaFactory.GetObtieneImagenesMemoriaTecnica(vm.id).then(function (response) {
              vm.Lista_evidencias = response.GetObtieneImagenesMemoriaTecnicaResult;
              vm.Lista_evidencias.forEach(function (item) {
                item.Ruta = item.Ruta;
                item.url = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
                item.thumbUrl = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
                item.RutaCompleta = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
                item.Opcion = 3;
              });

              memoriaFactory.GetObtieneEquiposSustituir(vm.id).then(function (result) {
                var eq = result.GetObtieneEquiposSustituirResult;

                eq.forEach(function (item) {
                  var equipo = {};
                  equipo.IdEquipoSustituir = item.IdEquipoSustituir;
                  equipo.IdMemoriaTecnica = item.IdMemoriaTecnica;
                  equipo.Equipo = item.Equipo;
                  equipo.SerieAnterior = item.SerieAnterior;
                  equipo.SerieNueva = item.SerieNueva;
                  equipo.Opcion = 2;
                  vm.cambios.push(equipo);
                });

                memoriaFactory.GetObtieneDigitalMemoriaTecnica().then(function (result) {
                  var ed = result.GetObtieneDigitalMemoriaTecnicaResult;
                  ed.forEach(function (item) {
                    var equipodig = {};
                    equipodig.IdEquipoSustituir = item.IdEquipoSustituir;
                    equipodig.IdMemoriaTecnica = item.IdMemoriaTecnica;
                    equipodig.Equipo = '';
                    equipodig.SerieAnterior = item.SerieAnterior;
                    equipodig.paquete = item.paquete;
                    equipodig.Opcion = 2;
                    vm.aparatosdigitales.push(equipodig);
                  });

                });
              });

            });
          });
        });
      }

      function addAparatodig() {
        var aparato = {
          'paquete': vm.paquete,
          'serie': vm.seriedigital
        };
        vm.aparatosdigitales.push(aparato);
      }


      function BorraImagen(index) {
        if (index > -1) {
          var obj = vm.Lista_evidencias[index];
          obj.Opcion = 2;
          vm.Imagenes_eliminadas.push(obj);
          vm.Lista_evidencias.splice(index, 1);
        }
      }


      function eliminaaparato(index) {
        if (index > -1) {
          var obj = vm.cambios[index];
          vm.cambios.splice(index, 1);
          if (obj.IdEquipoSustituir > 0) {
            obj.Opcion = 2;
            vm.cambios_eliminados.push(obj);

          }
        }
      }

      function eliminaaparatodig(index) {
        if (index > -1) {
          var obj = vm.aparatosdigitales[index];
          vm.aparatosdigitales.splice(index, 1);
          if (obj.IdEquipoSustituir > 0) {
            obj.Opcion = 2;
            vm.digitales_eliminados.push(obj);

          }
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
            obj.IdEquipoSustituir = 0;
            obj.IdMemoriaTecnica = vm.id;
            obj.Opcion = 1;
            console.log(obj);
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
          'IdMemoriaTecnica': vm.IdMemoriaTecnica,
          'SAN': (isvalid(vm.SAN) === true) ? vm.SAN : 0,
          'Contrato': (isvalid(vm.contrato) === true) ? vm.contrato : 0,
          'Distribuidor': (isvalid(vm.distribuidor) === true) ? vm.distribuidor : '',
          'Instalador': (isvalid(vm.instalador) === true) ? vm.instalador : '',
          'FechaVisita': (isvalid(vm.fechasitio) === true) ? $filter('date')(vm.fechasitio, 'yyyy-MM-dd') : '',
          'HoraLlegada': (isvalid(vm.horallegada) === true) ? vm.horallegada : '',
          'HoraSalida': (isvalid(vm.horasalida) === true) ? vm.horasalida : '',
          'SiteId': (isvalid(vm.siteid) === true) ? vm.siteid : '',
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


        memoriaFactory.UpdateGuardaMemoriaTecnica(obj).then(function (response) {
          var equipos_ = [];
          vm.cambios.forEach(function (item) {

            if (item.Opcion === 1) {
              var equipo = {};
              equipo.IdEquipoSustituir = item.IdEquipoSustituir;
              equipo.IdMemoriaTecnica = item.IdMemoriaTecnica;
              equipo.Equipo = item.Equipo;
              equipo.SerieAnterior = item.SerieAnterior;
              equipo.SerieNueva = item.SerieNueva;
              equipo.Opcion = item.Opcion;
              equipos_.push(equipo);
            }

          });

          vm.cambios_eliminados.forEach(function (item) {
            var equipo = {};
            equipo.IdEquipoSustituir = item.IdEquipoSustituir;
            equipo.IdMemoriaTecnica = item.IdMemoriaTecnica;
            equipo.Equipo = item.Equipo;
            equipo.SerieAnterior = item.SerieAnterior;
            equipo.SerieNueva = item.SerieNueva;
            equipo.Opcion = item.Opcion;
            equipos_.push(equipo);
          });
          console.log(equipos_);


          var equiposdig_ = [];
          vm.aparatosdigitales.forEach(function (item) {
            if (item.Opcion === 1) {
              var equipo = {};
              equipo.IdEquipoSustituir = item.IdEquipoSustituir;
              equipo.IdMemoriaTecnica = item.IdMemoriaTecnica;
              equipo.Equipo = '';
              equipo.SerieAnterior = item.SerieAnterior;
              equipo.SerieNueva = '';
              equipo.paquete = item.paquete;
              equipo.Opcion = item.Opcion;
              equiposdig_.push(equipo);
            }
          });

          vm.digitales_eliminados.forEach(function (item) {
            var equipo = {};
            equipo.IdEquipoSustituir = item.IdEquipoSustituir;
            equipo.IdMemoriaTecnica = item.IdMemoriaTecnica;
            equipo.Equipo = '';
            equipo.SerieAnterior = item.SerieAnterior;
            equipo.SerieNueva = '';
            equipo.Opcion = item.Opcion;
            equiposdig_.push(equipo);
          });
          console.log(equiposdig_);
          memoriaFactory.GetGuardaEquiposDigital(equiposdig_).then(function (data) {

            memoriaFactory.GuardaEquiposSustituir(equipos_).then(function (result) {
              console.log(result);
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
                  };
                  file_options.push(options);
                  tipos.push(f._file.idtipo);
                  files.push(f._file);
                }

              });
              if (count > 0) {
                ngNotify.set('Existen imagenes con el mismo tipo', 'error');
                return;
              } else {
                memoriaFactory.GuardaImagenesMemoriaTecnica(files, vm.IdMemoriaTecnica, file_options, vm.Imagenes_eliminadas).then(function (data) {
                  vm.uploader.clearQueue();
                  ngNotify.set('La memoria técnica  se ha guardado correctamente', 'success');
                  $state.go('home.memoria.memoriastecnicas');
                });
              }
            });
          });
        });

      }

      function detalle(det) {
        vm.Apuntamiento = det.Apuntamiento;
        vm.tamanoantena = det.Antena;
        vm.beam = det.Beam;
        vm.CambioComponentes = det.CambioComponentes;
        vm.celular = det.Celular;
        vm.cliente = det.Cliente;
        vm.numeroorden = det.Clv_Orden;
        vm.codigopostal = det.CodigoPostal;
        vm.contrato = det.Contrato;
        vm.detalleinstalacion = det.Detalles;
        vm.direccion = det.Direccion;
        vm.distribuidor = det.Distribuidor;
        vm.domicilionotificacion = det.DomicilioNotificacion;
        vm.estado = det.Estado;
        vm.estatustecnico = det.EstatusTecnico;
        vm.fechacaptura = det.Fecha;
        vm.fechaactivacion = det.FechaActivacion;
        vm.fechasitio = det.FechaVisita;
        vm.numerofolio = det.Folio;
        vm.mensajefolio = (vm.numerofolio > 0) ? 'Folio generado' : 'Generar Folio';
        vm.generafolio = (vm.numerofolio > 0) ? true : false;
        vm.blockgenerafolio = (vm.numerofolio > 0) ? true : false;
        vm.horallegada = det.HoraLlegada;
        vm.horasalida = det.HoraSalida;
        vm.IdMemoriaTecnica = det.IdMemoriaTecnica;
        vm.IdUsuario = det.IdUsuario;
        vm.Instalacion = det.Instalacion;
        vm.InstalacionDemo = det.InstalacionDemo;
        vm.instalador = det.Instalador;
        vm.latitud = det.Latitud;
        vm.localidad = det.Localidad;
        vm.longitud = det.Longitud;
        vm.Mantenimiento = det.Mantenimiento;
        vm.marcarouter = det.MarcaRouter;
        vm.modem = det.Modem;
        vm.municipio = det.Municipio;
        vm.recibe = det.PersonaRecibe;
        vm.plataforma = det.Plataforma;
        vm.serieradio = det.Radio;
        vm.Reubicacion = det.Reubicacion;
        vm.serierouter = det.Router;
        vm.SAN = det.SAN;
        vm.sqf = det.SQF;
        vm.plan = det.Servicio;
        vm.siteid = det.SiteId;
        vm.SiteSurvey = det.SiteSurvey;
        vm.telefono = det.Telefono;
        vm.tiposervicio = det.TipoServicio;
        vm.upsserie = det.UPS;
        vm.vcfaseneutro = det.VCFaseNeutro;
        vm.vcfasetierra = det.VCFaseTierra;
        vm.vcneutrotierra = det.VCNeutroTierra;
        vm.upcfaseneutro = det.VUPSFaseNeutro;
        vm.upcfasetierra = det.VUPSFaseTierra;
        vm.upcneutrotierra = det.VUPSNeutroTierra;
        vm.velocidad = det.Velocidad;
        vm.wifiserie = det.WiFi;

        vm.titulo = 'Edición de memoria técnica #' + vm.IdMemoriaTecnica;
      }

      function obtenfolio() {

        memoriaFactory.GetGeneraFolioMemoriaTecnica(vm.IdMemoriaTecnica)
          .then(function (response) {
            vm.numerofolio = response.GetGeneraFolioMemoriaTecnicaResult;
            vm.mensajefolio = (vm.numerofolio > 0) ? 'Folio generado' : 'Generar Folio';
            vm.generafolio = (vm.numerofolio > 0) ? true : false;
            vm.blockgenerafolio = (vm.numerofolio > 0) ? true : false;

          });

      }


      var openLightboxModal =
        function (index) {
          Lightbox.openModal(vm.Lista_evidencias, index);
        };


      var vm = this;
      vm.uploader = new FileUploader();
      vm.id = $stateParams.id;
      initialData();
      vm.openLightboxModal = openLightboxModal;
      vm.showguardar = true;
      vm.seleccionImagen = true;
      vm.detalle = false;
      vm.guardar = guardar;
      vm.cambioAparato = cambioAparato;
      vm.cambios = [];
      vm.cambios_eliminados = [];
      vm.eliminaaparato = eliminaaparato;
      vm.Imagenes_eliminadas = [];
      vm.BorraImagen = BorraImagen;
      vm.obtenfolio = obtenfolio;
      vm.aparatosdigitales = [];
      vm.digitales_eliminados = [];
      vm.eliminaaparatodig = eliminaaparatodig;
      vm.addAparatodig = addAparatodig;
      vm.uploader.onAfterAddingFile = function (fileItem) {
        fileItem.file.idtipo = vm.tipoimagen.IdTipo;
        fileItem.file.tipo = vm.tipoimagen.Nombre;
        fileItem._file.idtipo = vm.tipoimagen.IdTipo;
        fileItem._file.tipo = vm.tipoimagen.Nombre;
      };
    });
