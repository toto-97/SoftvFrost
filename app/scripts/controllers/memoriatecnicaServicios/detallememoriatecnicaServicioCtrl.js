'use strict';
angular
  .module('softvFrostApp')
  .controller('detallememoriatecnicaServicioCtrl',
    function ($state, ngNotify, memoriaServicioFactory, memoriaFactory, $localStorage, $stateParams, FileUploader, globalService, Lightbox) {
      function initialData() {
        memoriaServicioFactory.GetObtieneMemoriaTecnica(vm.id).then(function (data) {
          detalle(data.GetObtieneMemoriaTecnicaServicioResult[0]);
          memoriaServicioFactory.GetObtieneImagenesMemoriaTecnica(vm.id).then(function (response) {
            vm.Lista_evidenciasVS = [];
              vm.Lista_evidencias = [];
              var Lista_evidencias = response.GetObtieneImagenesMemoriaTecnicaServicioResult;
              Lista_evidencias.forEach(function (item) {
                item.Ruta = item.Ruta;
                item.url = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
                item.thumbUrl = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
                item.RutaCompleta = globalService.getUrlmemoriatecnicaImages() + '/' + item.Ruta;
                item.Opcion = 2;
                if (item.ValidacionEnSitio) {
                  vm.Lista_evidenciasVS.push(item);
                }
                else {
                  vm.Lista_evidencias.push(item);
                }
              });

            memoriaServicioFactory.GetObtieneObservacionesMemoriaTecnica(vm.id).then(function (result) {
              var notas = result.GetObtieneObservacionesMemoriaTecnicaServicioResult;
              notas.forEach(function (item) {
                var obj = {};
                obj.Observacion = item.Observacion;
                obj.IdUsuario = 0;
                obj.IdObservacion = 0;
                obj.Fecha = item.Fecha;
                obj.Nombre = item.Nombre;
                vm.notas_ant.push(obj);

              });
            });

            memoriaServicioFactory.GetObtieneEquiposSustituir(vm.id).then(function (result) {
              var eq = result.GetObtieneEquiposSustituirServicioResult;
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
              memoriaServicioFactory.GetObtieneDigitalMemoriaTecnica(vm.id).then(function (result) {
                var ed = result.GetObtieneDigitalMemoriaTecnicServicioaResult;
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

                memoriaFactory.GetEstatusTecnico().then(function (estatus) {
                  vm.listEstatus = estatus.GetEstatusTecnicoResult;
                  vm.listEstatus.forEach(function (item, index) {
                    if (item.IdEstatusTecnico === vm.IdEstatusTecnico) {
                      vm.estatustecnico = vm.listEstatus[index];
                    }
                  });

                  memoriaFactory.GetTipoServicio().then(function (tipos) {
                    vm.listTiposerv = tipos.GetTipoServicioResult;
                    vm.listTiposerv.forEach(function (item, index) {
                      if (item.IdTipoServicio === vm.IdTipoServicio) {
                        vm.tiposervicio = vm.listTiposerv[index];
                      }
                    });


                  });
                });
              });
            });
          });
        });
      }

      function getApartos(modem, radio, router, antena, ups, idtecnico) {
        /*
          memoriaServicioFactory.GetAparatosTecnico(1, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
            vm.listModem = aparatos.GetAparatosTecnicoResult;
            if (vm.numerofolio) {          
              vm.listModem.push({
                'Clv_CableModem': 0,
                'Descripcion': (modem)?modem:'',
                'Servicio': ''
              });
            }
  
  
            vm.listModem.forEach(function(item,index){
               if(item.Descripcion===modem){
                vm.modem=vm.listModem[index];
               }
            });
  
            memoriaServicioFactory.GetAparatosTecnico(2, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
              vm.listRadio = aparatos.GetAparatosTecnicoResult;
  
              if (vm.numerofolio) {
                vm.listRadio.push({
                  'Clv_CableModem': 0,
                  'Descripcion': (radio)?radio:'',
                  'Servicio': ''
                });
              }
  
              vm.listRadio.forEach(function(item,index){
                if(item.Descripcion===radio){
                  vm.serieradio=vm.listRadio[index];
                }             
              });
  
              memoriaServicioFactory.GetAparatosTecnico(3, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                vm.listRouter = aparatos.GetAparatosTecnicoResult;
  
                if (vm.numerofolio) {
                  vm.listRouter.push({
                    'Clv_CableModem': 0,
                    'Descripcion': (router)?router:'',
                    'Servicio': ''
                  });
                }
  
                vm.listRouter.forEach(function(item,index){
                 if(item.Descripcion===router){
                  vm.serierouter=vm.listRouter[index];
                 }
                });
                
  
                memoriaServicioFactory.GetAparatosTecnico(4, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                  vm.listSTB = aparatos.GetAparatosTecnicoResult;
  
  
                  memoriaServicioFactory.GetAparatosTecnico(5, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                    vm.listAntena = aparatos.GetAparatosTecnicoResult;
  
                    if (vm.numerofolio) {
                      vm.listAntena.push({
                        'Clv_CableModem': 0,
                        'Descripcion': (antena)?antena:'',
                        'Servicio': ''
                      });
                    }
  
                    vm.listAntena.forEach(function(item,index){
                      if(item.Descripcion===antena){
                        vm.antena=vm.listAntena[index];
                       }
                    });
  
                    memoriaServicioFactory.GetAparatosTecnico(6, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                      vm.listUPS = aparatos.GetAparatosTecnicoResult;
  
                      if (vm.numerofolio) {
                        vm.listUPS.push({
                          'Clv_CableModem': 0,
                          'Descripcion': (ups)?ups:'',
                          'Servicio': ''
                        });
                      }
  
                      vm.listUPS.forEach(function(item,index){
                        if(item.Descripcion===ups){
                          vm.upsserie=vm.listUPS[index];
                         }
                      })
                    });
                  });
                });
              });
            });
          });*/
      }


      function getTecnicos(id, idtecnico, Modem, Radio, Router, Antena, UPS) {
        memoriaServicioFactory.GetTecnicosMemoriaTecnica(id, 'C', vm.IdMemoriaTecnica).then(function (tecnicos) {
          vm.listTecnicos = tecnicos.GetTecnicosMemoriaTecnicaServicioResult;
          vm.listTecnicos.forEach(function (item, index) {
            if (item.IdEntidad === idtecnico) {
              vm.instalador = vm.listTecnicos[index];
            }
          });

          getApartos(Modem, Radio, Router, Antena, UPS, idtecnico);
        });
      }

      function detalle(det) {
        vm.usuariosistema = det.Instalador;
        vm.Apuntamiento = det.Apuntamiento;
        vm.tamanoantena = det.Antena;
        vm.beam = det.Beam;
        vm.CambioComponentes = det.CambioComponentes;
        vm.celular = det.Celular;
        vm.cliente = det.Cliente;
        vm.numeroqueja = det.Clv_Queja;
        vm.codigopostal = det.CodigoPostal;
        vm.contrato = det.Contrato;
        vm.detalleinstalacion = det.Detalles;
        vm.direccion = det.Direccion;
        vm.distribuidor = det.Distribuidor;
        vm.domicilionotificacion = det.DomicilioNotificacion;
        vm.estado = det.Estado;
        vm.estatustecnico = det.EstatusTecnico;
        vm.fechacaptura = det.Fecha;
        var fecAux = moment(det.FechaActivacion, 'DD-MM-YYYY').toDate();
        //console.log('Prueba',fecAux);
        vm.fechaactivacion = new Date(fecAux);//$filter('date')(det.FechaActivacion, 'dd/MM/yyyy');//det.FechaActivacion;
        //vm.fechaactivacion = det.FechaActivacion;
        vm.fechasitio = det.FechaVisita;
        vm.numerofolio = det.Folio;
        vm.numerofolioVS = det.FolioVS ? det.FolioVS : '';
        vm.horallegada = det.HoraLlegada;
        vm.horasalida = det.HoraSalida;
        vm.IdMemoriaTecnica = det.IdMemoriaTecnica;
        vm.IdUsuario = det.IdUsuario;
        vm.Instalacion = det.Instalacion;
        vm.InstalacionDemo = det.InstalacionDemo;
        vm.latitud = det.Latitud;
        vm.localidad = det.Localidad;
        vm.longitud = det.Longitud;
        vm.Mantenimiento = det.Mantenimiento;
        vm.marcarouter = det.MarcaRouter;
        vm.municipio = det.Municipio;
        vm.recibe = det.PersonaRecibe;
        vm.plataforma = det.Plataforma;
        vm.Reubicacion = det.Reubicacion;
        vm.SAN = det.SAN;
        vm.sqf = det.SQF;
        vm.SQFInstalacion = det.SQFInstalacion;
        vm.plan = det.Servicio;
        vm.siteid = det.SiteId;
        vm.SiteSurvey = det.SiteSurvey;
        vm.telefono = det.Telefono;
        vm.tiposervicio = det.TipoServicio;
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
        vm.contratocompania = det.contratocompania;
        vm.IdEstatusTecnico = det.IdEstatusTecnico;
        vm.IdTipoServicio = det.IdTipoServicio;
        vm.modem = det.Modem;
        vm.antena = det.AntenaSerie;
        vm.serierouter = det.Router;
        vm.tamanoantena = det.Antena;
        vm.upsserie = det.UPS;
        vm.serieradio = det.Radio;
        vm.CodigodeEstado = det.CodigoEstado == undefined ? '' : det.CodigoEstado;
        vm.SQFVS = det.SQFVS == undefined ? '' : det.SQFVS;
        vm.TransmitRate = det.TransmitRate == undefined ? '' : det.TransmitRate;
        vm.PowerAttenuation = det.PowerAttenuation == undefined ? '' : det.PowerAttenuation;
        if (vm.PowerAttenuation.length > 0) {
          vm.PowerAttenuations.forEach(function (item, index) {
            if (item.Descripcion === det.PowerAttenuation) {
              vm.PowerAttenuation = item;
            }
          });
        }
        vm.PruebaACP = det.PruebaACP == undefined ? '' : det.PruebaACP;
        vm.VoltajeComercialNT = det.VoltajeComercialNT == undefined ? '' : det.VoltajeComercialNT;
        vm.VoltajeComercialFT = det.VoltajeComercialFT == undefined ? '' : det.VoltajeComercialFT;
        vm.VoltajeComercialFN = det.VoltajeComercialFN == undefined ? '' : det.VoltajeComercialFN;
        console.log('det',det);
        getTecnicos(vm.contratocompania.split('-')[1], det.IdTecnico, det.Modem, det.Radio, det.Router, det.AntenaSerie, det.UPS);

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
      vm.titulo = 'Detalle de memoria técnica de reporte #' + vm.id;
      vm.detalle = true;
      vm.CambioDeEquipos = false;
      vm.PowerAttenuations = [
        {
          'IdPower': 4,
          'Descripcion': '1 db'
        },
        {
          'IdPower': 6,
          'Descripcion': '2 db'
        },
        {
          'IdPower': 1,
          'Descripcion': '3 db'
        },
        {
          'IdPower': 3,
          'Descripcion': '4 db'
        },
        {
          'IdPower': 2,
          'Descripcion': '5 db'
        },
        {
          'IdPower': 5,
          'Descripcion': '6 db'
        },
        {
          'IdPower': 7,
          'Descripcion': '7 db'
        },
        {
          'IdPower': 8,
          'Descripcion': '8 db'
        },
        {
          'IdPower': 9,
          'Descripcion': '9 db'
        },
        {
          'IdPower': 10,
          'Descripcion': '10 db'
        },
        {
          'IdPower': 11,
          'Descripcion': 'Mayor > 10 db'
        }
      ];
      vm.EquiposSustituir = [
        {
          'IdEquipo': 4,
          'Nombre': 'STB'
        },
        {
          'IdEquipo': 6,
          'Nombre': 'UPS'
        },
        {
          'IdEquipo': 1,
          'Nombre': 'Modem'
        },
        {
          'IdEquipo': 3,
          'Nombre': 'Router'
        },
        {
          'IdEquipo': 2,
          'Nombre': 'Radio'
        },
        {
          'IdEquipo': 5,
          'Nombre': 'Antena Internet'
        },
        {
          'IdEquipo': 7,
          'Nombre': 'LNB'
        },
        {
          'IdEquipo': 8,
          'Nombre': 'Antena Digital'
        },
      ];
    });
