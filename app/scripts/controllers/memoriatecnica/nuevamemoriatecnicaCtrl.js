"use strict";
angular
  .module("softvFrostApp")
  .controller("nuevamemoriatecnicaCtrl", function (
    $state,
    ngNotify,
    memoriaFactory,
    $localStorage,
    $uibModal,
    $filter,
    FileUploader,
    $firebaseArray,
    firebase,
    moment

  ) {
    var vm = this;
    vm.cambios = [];
    vm.notas = [];
    vm.cambios_eliminados = [];
    vm.aparatosdigitales = [];
    vm.cambioAparato = cambioAparato;
    vm.eliminaaparato = eliminaaparato;
    vm.guardar = guardar;
    vm.BorraImagen = BorraImagen;
    vm.showguardar = false;
    vm.seleccionImagen = true;
    vm.detalle = false;
    vm.validar = validar;
    vm.generafolio = false;
    vm.mensajefolio = "Generar Folio";
    vm.blockgenerafolio = true;
    vm.obtenfolio = obtenfolio;
    vm.titulo = "Registro de memoria técnica";
    vm.addAparatodig = addAparatodig;
    vm.eliminaaparatodig = eliminaaparatodig;
    vm.blockorden = false;
    vm.blockcontrato = false;
    vm.Imagenes_eliminadas = [];
    vm.guardaNota=guardaNota;
  
    initialData();

    function getValidationdata(obj) {
      var results = obj;
      vm.celular = results.Celular;
      vm.cliente = results.Cliente;
      vm.beam = results.Beam;
      vm.contrato = results.Contrato;
      vm.direccion = results.Direccion;
      vm.distribuidor = results.Distribuidor;
      vm.estado = results.Estado;
      vm.latitud = results.Latitud;
      vm.localidad = results.Localidad;
      vm.longitud = results.Longitud;
      vm.municipio = results.Municipio;
      vm.plataforma = results.Plataforma;
      vm.contratocompania = results.contratocompania;
      vm.SAN = results.SAN;
      vm.plan = results.Servicio;
      vm.telefono = results.Telefono;
    }

    function obtenfolio() {}

    function validar() {
      memoriaFactory
        .GetObtieneDatosPorOrden(vm.numeroorden)
        .then(function (result) {
          console.log(result);
          if (result.GetObtieneDatosPorOrdenResult.length > 0) {
            if (result.GetObtieneDatosPorOrdenResult[0].Error > 0) {
              ngNotify.set(
                result.GetObtieneDatosPorOrdenResult[0].Msg,
                "error"
              );
              getValidationdata(result.GetObtieneDatosPorOrdenResult[0]);
            } else {
              getValidationdata(result.GetObtieneDatosPorOrdenResult[0]);
              vm.showguardar = true;
            }
          } else {
            ngNotify.set(
              "El Numero de orden ingresado no es válido ,intente con otro",
              "warn"
            );
          }
        });
    }

    vm.uploader = new FileUploader({
      filters: [{
        name: "yourName1",
        fn: function (item) {
          var count = 0;
          vm.uploader.queue.forEach(function (f) {
            count += f._file.name === item.name ? 1 : 0;
          });
          if (count > 0) {
            ngNotify.set(
              "Un archivo con ese mismo nombre ya fue seleccionado",
              "warn"
            );
            return false;
          } else {
            return true;
          }
        }
      }]
    });

    function addAparatodig() {
      var obj = {};
      obj.SerieAnterior = vm.seriedigital;
      obj.IdEquipoSustituir = 0;
      obj.IdMemoriaTecnica = 0;
      obj.paquete = vm.paquete;
      obj.Opcion = 1;
      vm.aparatosdigitales.push(obj);
    }

    function eliminaaparatodig(index) {
      if (index > -1) {
        vm.aparatosdigitales.splice(index, 1);
      }
    }

    vm.uploader.onAfterAddingFile = function (fileItem) {
      fileItem.file.idtipo = vm.tipoimagen.IdTipo;
      fileItem.file.tipo = vm.tipoimagen.Nombre;
      fileItem._file.idtipo = vm.tipoimagen.IdTipo;
      fileItem._file.tipo = vm.tipoimagen.Nombre;
    };

    function initialData() {
      /* var ref = firebase
         .database()
         .ref()
         .child("messages");
       vm.messages = $firebaseArray(ref);
       vm.messages.$add({
         Idmemoria: 1,
         Fecha: moment().format("L"),
         Hora: moment().format("LT")
       });*/
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
      if (
        vm.serieanterior !== "" &&
        vm.serieanterior !== undefined &&
        (vm.equiposurtir !== "" && vm.equiposurtir !== undefined) &&
        (vm.serienueva !== "" && vm.serienueva !== undefined)
      ) {
        if (vm.serienueva !== vm.serieanterior) {
          var obj = {};
          obj.SerieAnterior = vm.serieanterior;
          obj.Equipo = vm.equiposurtir;
          obj.SerieNueva = vm.serienueva;
          obj.Opcion = 1;
          vm.cambios.push(obj);
          vm.serieanterior = "";
          vm.equiposurtir = "";
          vm.serienueva = "";
        } else {
          ngNotify.set("Las series no pueden ser iguales", "error");
        }
      } else {
        ngNotify.set("Necesita completar todos los campos", "error");
      }
    }

    function isvalid(value) {
      return value !== undefined && value !== "" && value !== null ?
        true :
        false;
    }

    function guardaNota() {
      var obj = {};
      obj.Observacion = vm.detallenota;
      obj.IdUsuario = $localStorage.currentUser.idUsuario;
      obj.IdObservacion = 0;
      obj.Fecha = moment().format('L');
      obj.Nombre = $localStorage.currentUser.nombre;
      vm.notas.push(obj);
    }

    function guardar() {
      var obj = {
        SAN: isvalid(vm.SAN) === true ? vm.SAN : 0,
        Contrato: isvalid(vm.contrato) === true ? vm.contrato : 0,
        Distribuidor: isvalid(vm.distribuidor) === true ? vm.distribuidor : "",
        Instalador: isvalid(vm.instalador) === true ? vm.instalador : "",
        FechaVisita: isvalid(vm.fechasitio) === true ?
          $filter("date")(vm.fechasitio, "yyyy/MM/dd") : "",
        HoraLlegada: isvalid(vm.horallegada) === true ? vm.horallegada : "",
        HoraSalida: isvalid(vm.horasalida) === true ? vm.horasalida : "",
        SiteId: isvalid(vm.siteid) === true ? vm.siteid : 0,
        Cliente: isvalid(vm.cliente) === true ? vm.cliente : "",
        Estado: isvalid(vm.estado) === true ? vm.estado : "",
        Municipio: isvalid(vm.municipio) === true ? vm.municipio : "",
        Localidad: isvalid(vm.localidad) === true ? vm.localidad : "",
        Direccion: isvalid(vm.direccion) === true ? vm.direccion : "",
        PersonaRecibe: isvalid(vm.recibe) === true ? vm.recibe : "",
        Plataforma: isvalid(vm.plataforma) === true ? vm.plataforma : "",
        Servicio: isvalid(vm.plan) === true ? vm.plan : "",
        TipoServicio: isvalid(vm.tiposervicio) === true ? vm.tiposervicio : "",
        Velocidad: isvalid(vm.velocidad) === true ? vm.velocidad : "",
        DomicilioNotificacion: isvalid(vm.domicilionotificacion) === true ?
          vm.domicilionotificacion : "",
        CodigoPostal: isvalid(vm.codigopostal) === true ? vm.codigopostal : "",
        Telefono: vm.telefono,
        Celular: vm.celular,
        Latitud: vm.latitud,
        Longitud: vm.longitud,
        Beam: isvalid(vm.beam) === true ? vm.beam : "",
        EstatusTecnico: isvalid(vm.estatustecnico) === true ? vm.estatustecnico : "",
        FechaActivacion: isvalid(vm.fechaactivacion) === true ?
          $filter("date")(vm.fechaactivacion, "yyyy/MM/dd") : "",
        VCNeutroTierra: isvalid(vm.vcneutrotierra) === true ? vm.vcneutrotierra : "",
        VCFaseTierra: isvalid(vm.vcfasetierra) === true ? vm.vcfasetierra : "",
        VCFaseNeutro: isvalid(vm.vcfaseneutro) === true ? vm.vcfaseneutro : "",
        VUPSNeutroTierra: isvalid(vm.upcneutrotierra) === true ? vm.upcneutrotierra : "",
        VUPSFaseTierra: isvalid(vm.upcfasetierra) === true ? vm.upcfasetierra : "",
        VUPSFaseNeutro: isvalid(vm.upcfaseneutro) === true ? vm.upcfaseneutro : "",
        Modem: isvalid(vm.modem) === true ? vm.modem : "",
        Antena: isvalid(vm.tamanoantena) === true ? vm.tamanoantena : "",
        SQF: isvalid(vm.sqf) === true ? vm.sqf : "",
        Radio: isvalid(vm.serieradio) === true ? vm.serieradio : "",
        Router: isvalid(vm.serierouter) === true ? vm.serierouter : "",
        MarcaRouter: isvalid(vm.marcarouter) === true ? vm.marcarouter : "",
        UPS: isvalid(vm.upsserie) === true ? vm.upsserie : "",
        WiFi: isvalid(vm.wifiserie) === true ? vm.wifiserie : "",
        Instalacion: vm.Instalacion,
        InstalacionDemo: vm.InstalacionDemo,
        Apuntamiento: vm.Apuntamiento,
        Reubicacion: vm.Reubicacion,
        CambioComponentes: vm.CambioComponentes,
        Mantenimiento: vm.Mantenimiento,
        SiteSurvey: vm.SiteSurvey,
        Detalles: isvalid(vm.detalleinstalacion) === true ? vm.detalleinstalacion : "",
        Folio: isvalid(vm.numerofolio) === true ? vm.numerofolio : 0,
        Clv_Orden: isvalid(vm.numeroorden) === true ? vm.numeroorden : 0,
        IdUsuario: $localStorage.currentUser.idUsuario
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
              IdImagen: 0,
              Accion: 1,
              Tipo: f._file.idtipo,
              Nombre: f._file.name
            };
            file_options.push(options);
            tipos.push(f._file.idtipo);
            files.push(f._file);
          }
        });
        if (count > 0) {
          ngNotify.set("Existen imagenes con el mismo tipo", "error");
          return;
        } else {
          memoriaFactory.GuardaImagenesMemoriaTecnica(files, vm.IdMemoriaTecnica, file_options, []).then(function (data) {
            ngNotify.set("las imagenes se han guardado correctamente", "success");
            vm.uploader.clearQueue();
            memoriaFactory
              .GuardaEquiposSustituir(vm.cambios)
              .then(function (result) {
                memoriaFactory
                  .GetGuardaEquiposDigital(vm.aparatosdigitales)
                  .then(function (data) {
                    if (vm.notas.length > 0) {
                      var objnota=vm.notas[0];
                      objnota.IdMemoriaTecnica=vm.IdMemoriaTecnica;
                      console.log(objnota);
                      memoriaFactory.GetGuardaObservacionMemoriaTecnicaList(objnota).then(function (resp) {});
                    }

                    var ref = firebase
                      .database()
                      .ref()
                      .child("messages");
                    vm.messages = $firebaseArray(ref);
                    vm.messages.$add({
                      Id: vm.IdMemoriaTecnica,
                      Fecha: moment().format("L"),
                      Hora: moment().format("LT"),
                      Mensaje:'Se ha generado una nueva memoria técnica',
                      Tipo:1
                    });

                    ngNotify.set(
                      "La memoria técnica se ha guardado correctamente",
                      "success"
                    );
                    $state.go("home.memoria.memoriastecnicas");






                  });
              });
          });
        }
      });
    }
  });
