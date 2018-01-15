'use strict';
angular
  .module('softvFrostApp')
  .controller('detallememoriatecnicaCtrl',
    function ($state, ngNotify, memoriaFactory, $localStorage, $stateParams, FileUploader, globalService, Lightbox) {
      function initialData() {
        memoriaFactory.GetObtieneMemoriaTecnica(vm.id).then(function (data) {
          detalle(data.GetObtieneMemoriaTecnicaResult[0]);
          memoriaFactory.GetObtieneImagenesMemoriaTecnica(vm.id).then(function (response) {
            vm.Lista_evidencias = response.GetObtieneImagenesMemoriaTecnicaResult;
            vm.Lista_evidencias.forEach(function (item) {
              item.Ruta = item.Ruta;
              item.url = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
              item.thumbUrl = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
              item.RutaCompleta = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
            });
            memoriaFactory.GetObtieneObservacionesMemoriaTecnica(vm.id).then(function (result) {
              console.log(result.GetObtieneObservacionesMemoriaTecnicaResult);
              var notas = result.GetObtieneObservacionesMemoriaTecnicaResult;
              notas.forEach(function (item) {
                console.log(item);
                var obj = {};
                obj.Observacion = item.Observacion;
                obj.IdUsuario = 0;
                obj.IdObservacion = 0;
                obj.Fecha = item.Fecha;
                obj.Nombre = item.Nombre;
                vm.notas_ant.push(obj);

              });
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
              memoriaFactory.GetObtieneDigitalMemoriaTecnica(vm.id).then(function (result) {
                var ed = result.GetObtieneDigitalMemoriaTecnicaResult;
                ed.forEach(function (item) {
                  var equipodig = {};
                  equipodig.IdEquipoSustituir = item.IdEquipoSustituir;
                  equipodig.IdMemoriaTecnica = item.IdMemoriaTecnica;
                  equipodig.Equipo = item.Equipo;
                  equipodig.SerieAnterior = item.SerieAnterior;
                  equipodig.paquete = item.paquete;                  
                  equipodig.Opcion = 2;
                  vm.aparatosdigitales.push(equipodig);
                });





              });
            });




            console.log(vm.Lista_evidencias);

          });
        });

      }

      function detalle(det) {

       console.log(det);

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
        vm.modem = parseInt(det.Modem);
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
        vm.numeroorden = det.Clv_Orden;
        vm.PersonaValidaServicio = det.PersonaValidaServicio;
        vm.Combo = det.Combo;
        vm.contratocompania=det.contratocompania;
      }


      var openLightboxModal =
        function (index) {
          Lightbox.openModal(vm.Lista_evidencias, index);
        };
      var vm = this;
      vm.uploader = new FileUploader();
      vm.id = $stateParams.id;
      initialData();
      vm.cambios = [];
      vm.notas = [];
      vm.notas_ant = [];
      vm.aparatosdigitales = [];
      vm.openLightboxModal = openLightboxModal;
      vm.showguardar = false;
      vm.seleccionImagen = false;
      vm.titulo = 'Detalle de memoria técnica #' + vm.id;
      vm.detalle = true;


    });
