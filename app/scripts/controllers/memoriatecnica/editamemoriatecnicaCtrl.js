'use strict';
angular
  .module('softvFrostApp')
  .controller('editamemoriatecnicaCtrl',
    function ($state, ngNotify, memoriaFactory, moment, firebase, $uibModal, $firebaseArray, $localStorage, $stateParams, $filter, catalogosMemoriaFactory, FileUploader, globalService, Lightbox, $q, Notification) {

      var ref = firebase
        .database()
        .ref()
        .child('messages');

      function GetdataFire() {
        var defered = $q.defer();
        var promise = defered.promise;
        var registros = [];
        var posts = $firebaseArray(ref);
        posts.$loaded().then(function (x) {
          x.forEach(function (item) {
            registros.push(item);
          });
          defered.resolve(registros);
        }).catch(function (err) {
          defered.reject(err)
        });
        return promise;
      }

      function deleteFile(index) {
        var defered = $q.defer();
        var promise = defered.promise;
        var posts = $firebaseArray(ref);
        posts.$loaded().then(function (x) {
          posts.$remove(index).then(function (ref) {
            defered.resolve(true);
          });

        }).catch(function (err) {
          defered.reject(false)
        });
        return promise;

      }

      function initialData() {

        memoriaFactory.ObtieneTiposImagenes().then(function (response) {
          //vm.tiposresp = response.GetObtieneTiposImagenesListResult;
          vm.tiposresp = [];
          vm.tiposrespValidacion = [];
          var tipos = response.GetObtieneTiposImagenesListResult;
          tipos.forEach(function (item) {
            if (item.ValidacionEnSitio) {
              vm.tiposrespValidacion.push(item);
            }
            else {
              vm.tiposresp.push(item);
            }
          });
          memoriaFactory.GetObtieneMemoriaTecnica(vm.id).then(function (data) {
            vm.OrdenInstalacion = data.GetObtieneMemoriaTecnicaResult[0].OrdenInstalacion;
            detalle(data.GetObtieneMemoriaTecnicaResult[0]);
            memoriaFactory.GetObtieneImagenesMemoriaTecnica(vm.id).then(function (response) {
              vm.Lista_evidenciasVS = [];
              vm.Lista_evidencias = [];
              var Lista_evidencias = response.GetObtieneImagenesMemoriaTecnicaResult;
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

              memoriaFactory.GetObtieneEquiposSustituir(vm.IdMemoriaTecnica).then(function (result) {
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
                memoriaFactory.GetObtieneDigitalMemoriaTecnica(vm.IdMemoriaTecnica).then(function (result) {
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

                  memoriaFactory.GetObtieneObservacionesMemoriaTecnica(vm.id).then(function (result) {
                    var notas = result.GetObtieneObservacionesMemoriaTecnicaResult;
                    notas.forEach(function (item) {

                      var obj = {};
                      obj.Observacion = item.Observacion;
                      obj.IdUsuario = 0;
                      obj.IdObservacion = 0;
                      obj.Fecha = item.Fecha;
                      obj.Nombre = item.Nombre;
                      vm.notas_ant.push(obj);

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
                        if (vm.IdAntena > 0) {
                          catalogosMemoriaFactory.GetObtieneAntenasCatalogo().then(function (data) {
                            var antenasTamanos = data.GetObtieneAntenasCatalogoResult;
                            vm.antenasTamanos = [];
                            antenasTamanos.forEach(function (item) {
                              if (item.IdAntena == vm.IdAntena) {
                                vm.antenaTamano = item;
                              }
                              if (item.Activo) {
                                vm.antenasTamanos.push(item);
                              }
                              else if (item.Activo == false && item.IdAntena == vm.IdAntena) {
                                vm.antenasTamanos.push(item);
                              }
                            });
                            memoriaFactory.GetObtieneObservacionesMemoriaTecnicaPestana(vm.id).then(function (result) {
                              //console.log(result);
                              var notas_pestana = result.GetObtieneObservacionesMemoriaTecnicaPestanaResult;
                              notas_pestana.forEach(function (item) {

                                var obj = {};
                                obj.Observacion = item.Observacion;
                                obj.IdUsuario = 0;
                                obj.IdObservacion = 0;
                                obj.Fecha = item.Fecha;
                                obj.Nombre = item.Nombre;
                                obj.Pestana = item.Pestana;
                                vm.notas_pestana_ant.push(obj);

                              });
                            });
                          });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }


      function getApartos(modem, radio, router, antena, ups, idtecnico) {
        if (vm.OrdenInstalacion) {
          memoriaFactory.GetAparatosTecnico(1, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
            vm.listModem = aparatos.GetAparatosTecnicoResult;

            if (idtecnico === -1) {
              vm.listModem.push({
                'Clv_CableModem': 0,
                'Descripcion': (modem) ? modem : '',
                'Servicio': ''
              });
            }
            vm.listModem.forEach(function (item, index) {
              if (item.Descripcion === modem) {
                vm.modem = vm.listModem[index];
              }
            });

            memoriaFactory.GetAparatosTecnico(2, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
              vm.listRadio = aparatos.GetAparatosTecnicoResult;
              if (idtecnico === -1) {
                vm.listRadio.push({
                  'Clv_CableModem': 0,
                  'Descripcion': (radio) ? radio : '',
                  'Servicio': ''
                });
              }
              vm.listRadio.forEach(function (item, index) {
                if (item.Descripcion === radio) {
                  vm.serieradio = vm.listRadio[index];
                }
              });

              memoriaFactory.GetAparatosTecnico(3, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                vm.listRouter = aparatos.GetAparatosTecnicoResult;
                if (idtecnico === -1) {
                  vm.listRouter.push({
                    'Clv_CableModem': 0,
                    'Descripcion': (router) ? router : '',
                    'Servicio': ''
                  });
                }
                vm.listRouter.forEach(function (item, index) {
                  if (item.Descripcion === router) {
                    vm.serierouter = vm.listRouter[index];
                  }
                });


                memoriaFactory.GetAparatosTecnico(4, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                  vm.listSTB = aparatos.GetAparatosTecnicoResult;


                  memoriaFactory.GetAparatosTecnico(5, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                    vm.listAntena = aparatos.GetAparatosTecnicoResult;
                    if (idtecnico === -1) {
                      vm.listAntena.push({
                        'Clv_CableModem': 0,
                        'Descripcion': (antena) ? antena : '',
                        'Servicio': ''
                      });
                    }
                    vm.listAntena.forEach(function (item, index) {
                      if (item.Descripcion === antena) {
                        vm.antena = vm.listAntena[index];
                      }
                    });

                    memoriaFactory.GetAparatosTecnico(6, vm.numeroorden, idtecnico, vm.IdMemoriaTecnica).then(function (aparatos) {
                      vm.listUPS = aparatos.GetAparatosTecnicoResult;
                      if (idtecnico === -1) {
                        vm.listUPS.push({
                          'Clv_CableModem': 0,
                          'Descripcion': (ups) ? ups : '',
                          'Servicio': ''
                        });
                      }
                      vm.listUPS.forEach(function (item, index) {
                        if (item.Descripcion === ups) {
                          vm.upsserie = vm.listUPS[index];
                        }
                      })
                    });
                  });
                });
              });
            });
          });
        }
        else {
          if (vm.instalador == undefined) {
            ngNotify.set("Es necesario elegir un técnico", "error");
          }
          else {
            memoriaFactory.GetAparatosActuales(vm.EquipoSustituir.IdEquipo, vm.numeroorden, vm.instalador.IdEntidad, 0).then(function (aparatosActuales) {
              //console.log('aparatosActuales',aparatosActuales);
              vm.AparatosAnterior = aparatosActuales.GetAparatosActualesResult;
              memoriaFactory.GetAparatosTecnicoCambio(vm.EquipoSustituir.IdEquipo, vm.numeroorden, vm.instalador.IdEntidad, 0).then(function (aparatos) {
                //console.log('aparatos',aparatos);
                vm.AparatosNuevo = aparatos.GetAparatosTecnicoCambioResult;
              });
            });
          }
        }
      }


      function getTecnicos(id, idtecnico, Modem, Radio, Router, Antena, UPS) {
        memoriaFactory.GetTecnicosMemoriaTecnica(id, 'M', vm.IdMemoriaTecnica).then(function (tecnicos) {
          vm.listTecnicos = tecnicos.GetTecnicosMemoriaTecnicaResult;
          vm.listTecnicos.forEach(function (item, index) {
            if (item.IdEntidad === idtecnico) {
              vm.instalador = vm.listTecnicos[index];
            }
          });
          getApartos(Modem, Radio, Router, Antena, UPS, idtecnico);
        });
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

      function validaAparatodig(serie) {
        var count = 0;
        vm.aparatosdigitales.forEach(function (item) {
          count += (item.SerieAnterior === serie) ? 1 : 0;
        });
        return (count > 0) ? true : false;
      }


      function addAparatodig() {

        if (vm.aparatosdigitales.length + 1 <= vm.NoSTB) {
          if (!validaAparatodig(vm.DTH.Descripcion)) {
            var obj = {};
            obj.SerieAnterior = vm.DTH.Descripcion;
            obj.IdEquipoSustituir = 0;
            obj.IdMemoriaTecnica = vm.id;
            obj.paquete = vm.DTH.Servicio;
            obj.Opcion = 3;
            obj.IdUsuario = $localStorage.currentUser.idUsuario;
            obj.Equipo = vm.DTH.Clv_CableModem;
            vm.aparatosdigitales.push(obj);
          } else {
            ngNotify.set('El aparato ya esta seleccionado', 'warn');
          }
        } else {
          ngNotify.set('Solo tiene registrado ' + vm.NoSTB + ' como cantidad máxima aparatos', 'warn');
        }
      }
      /*
            function addAparatodig() {
              if( vm.aparatosdigitales.length < 2){
                var obj = {};
                obj.SerieAnterior = vm.seriedigital;
                obj.IdEquipoSustituir = 0;
                obj.IdMemoriaTecnica = vm.id;
                obj.paquete = vm.paquete;
                obj.Opcion = 3;
                obj.IdUsuario = $localStorage.currentUser.idUsuario;
                obj.Equipo = vm.equipodigital;
                vm.aparatosdigitales.push(obj);
              }

            } */


      function BorraImagen(index) {
        if (index > -1) {
          var obj = vm.Lista_evidencias[index];
          obj.Opcion = 2;
          obj.IdUsuario = $localStorage.currentUser.idUsuario;
          vm.Imagenes_eliminadas.push(obj);
          vm.Lista_evidencias.splice(index, 1);
        }
      }

      function BorraImagenVS(index) {
        if (index > -1) {
          var obj = vm.Lista_evidenciasVS[index];
          obj.Opcion = 2;
          obj.IdUsuario = $localStorage.currentUser.idUsuario;
          vm.Imagenes_eliminadas.push(obj);
          vm.Lista_evidenciasVS.splice(index, 1);
        }
      }


      function eliminaaparato(index) {
        if (index > -1) {
          var obj = vm.cambios[index];
          vm.cambios.splice(index, 1);
          if (obj.IdEquipoSustituir > 0) {
            obj.Opcion = 2;
            obj.IdUsuario = $localStorage.currentUser.idUsuario;
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
            obj.IdUsuario = $localStorage.currentUser.idUsuario;
            vm.digitales_eliminados.push(obj);

          }
        }
      }


      function cambioAparato() {
        if (vm.AparatoAnterior && vm.EquipoSustituir && vm.AparatoNuevo) {
          if (vm.AparatoAnterior.Descripcion !== vm.AparatoNuevo.Descripcion) {
            vm.cambios.forEach(function (item) {
              if (item.SerieAnterior == vm.AparatoAnterior.Descripcion) {
                ngNotify.set("La serie del aparato que se trata de cambiar ya está en la lista", "error");
                Cambia = false;
              }
              else if (item.SerieNueva == vm.AparatoNuevo.Descripcion) {
                ngNotify.set("La serie del aparato que se trata de cambiar ya está en la lista", "error");
                Cambia = false;
              }
            });
            var obj = {};
            obj.SerieAnterior = vm.AparatoAnterior.Descripcion;
            obj.Equipo = vm.EquipoSustituir.Nombre;
            obj.SerieNueva = vm.AparatoNuevo.Descripcion;
            obj.IdEquipoSustituir = 0;
            obj.IdMemoriaTecnica = vm.id;
            obj.IdUsuario = $localStorage.currentUser.idUsuario;
            obj.Opcion = 3;

            vm.cambios.push(obj);
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

        var IdAntenaAux = 0;
        var tamanoantenaAux = 0;
        if (vm.IdAntena > 0) {
          IdAntenaAux = vm.antenaTamano.IdAntena;
          tamanoantenaAux = vm.antenaTamano.Nombre;
        }
        else {
          IdAntenaAux = 0;
          tamanoantenaAux = vm.tamanoantenaAux;
        }
        if (vm.OrdenInstalacion) {
          var obj = {
            'IdMemoriaTecnica': vm.IdMemoriaTecnica,
            'SAN': (vm.SAN) ? vm.SAN : 0,
            'Contrato': (vm.contrato) ? vm.contrato : 0,
            'Distribuidor': vm.distribuidor ? vm.distribuidor : '',
            'Instalador': vm.usuariosistema,
            'FechaVisita': (vm.fechasitio) ? vm.fechasitio : '', // $filter('date')(vm.fechasitio, 'yyyy-MM-dd') : '',
            'HoraLlegada': (vm.horallegada) ? vm.horallegada : '',
            'HoraSalida': (vm.horasalida) ? vm.horasalida : '',
            'SiteId': 0,
            'Cliente': (vm.cliente) ? vm.cliente : '',
            'Estado': (vm.estado) ? vm.estado : '',
            'Municipio': (vm.municipio) ? vm.municipio : '',
            'Localidad': (vm.localidad) ? vm.localidad : '',
            'Direccion': (vm.direccion) ? vm.direccion : '',
            'PersonaRecibe': (vm.recibe) ? vm.recibe : '',
            'Plataforma': (vm.plataforma) ? vm.plataforma : '',
            'Servicio': (vm.plan) ? vm.plan : '',
            'TipoServicio': (vm.tiposervicio) ? vm.tiposervicio.IdTipoServicio : 0,
            'Velocidad': (vm.velocidad) ? vm.velocidad : '',
            'DomicilioNotificacion': (vm.domicilionotificacion) ? vm.domicilionotificacion : '',
            'CodigoPostal': (vm.codigopostal) ? vm.codigopostal : '',
            'Telefono': vm.telefono,
            'Celular': vm.celular,
            'Latitud': vm.latitud,
            'Longitud': vm.longitud,
            'Beam': (vm.beam) ? vm.beam : '',
            'EstatusTecnico': (vm.estatustecnico) ? vm.estatustecnico.IdEstatusTecnico : '',
            'FechaActivacion': (vm.fechaactivacion) ? $filter('date')(vm.fechaactivacion, 'yyyyMMdd') : '19000101',
            'VCNeutroTierra': (vm.vcneutrotierra) ? vm.vcneutrotierra : '',
            'VCFaseTierra': (vm.vcfasetierra) ? vm.vcfasetierra : '',
            'VCFaseNeutro': (vm.vcfaseneutro) ? vm.vcfaseneutro : '',
            'VUPSNeutroTierra': (vm.upcneutrotierra) ? vm.upcneutrotierra : '',
            'VUPSFaseTierra': (vm.upcfasetierra) ? vm.upcfasetierra : '',
            'VUPSFaseNeutro': (vm.upcfaseneutro) ? vm.upcfaseneutro : '',
            'Modem': (vm.modem) ? vm.modem.Descripcion : '',
            'Antena': tamanoantenaAux,
            'SQF': (vm.sqf) ? vm.sqf : '',
            'Radio': (vm.serieradio) ? vm.serieradio.Descripcion : '',
            'Router': (vm.serierouter) ? vm.serierouter.Descripcion : '',
            'MarcaRouter': (vm.marcarouter) ? vm.marcarouter : '',
            'UPS': (vm.upsserie) ? vm.upsserie.Descripcion : '',
            'WiFi': '',
            'Instalacion': vm.Instalacion,
            'InstalacionDemo': vm.InstalacionDemo,
            'Apuntamiento': vm.Apuntamiento,
            'Reubicacion': vm.Reubicacion,
            'CambioComponentes': vm.CambioComponentes,
            'Mantenimiento': vm.Mantenimiento,
            'SiteSurvey': vm.SiteSurvey,
            'Detalles': (vm.detalleinstalacion) ? vm.detalleinstalacion : '',
            'Folio': (vm.numerofolio) ? vm.numerofolio : 0,
            'Clv_Orden': (vm.numeroorden) ? vm.numeroorden : 0,
            'IdUsuario': $localStorage.currentUser.idUsuario,
            'PersonaValidaServicio': vm.PersonaValidaServicio,
            'IdEstatusTecnico': (vm.estatustecnico) ? vm.estatustecnico.IdEstatusTecnico : 0,
            'IdTipoServicio': (vm.tiposervicio) ? vm.tiposervicio.IdTipoServicio : 0,
            'IdTecnico': (vm.instalador) ? vm.instalador.IdEntidad : 0,
            'AntenaSerie': (vm.antena) ? vm.antena.Descripcion : "",
            'IdAntena': IdAntenaAux,
            'CodigoEstado': vm.CodigodeEstado,
            'SQFVS': vm.SQFVS,
            'TransmitRate': vm.TransmitRate,
            'PowerAttenuation': vm.PowerAttenuation.Descripcion,
            'PruebaACP': vm.PruebaACP,
            'VoltajeComercialNT': vm.VoltajeComercialNT,
            'VoltajeComercialFT': vm.VoltajeComercialFT,
            'VoltajeComercialFN': vm.VoltajeComercialFN,
            'CheckDatosSitio': vm.CheckDatosSitio,
            'CheckValidacionSitio': vm.CheckValidacionSitio,
            'CheckTrabajosRealizados': vm.CheckTrabajosRealizados,
            'CheckMedicionesElectricas': vm.CheckMedicionesElectricas,
            'CheckDatosEquipoDesempeno': vm.CheckDatosEquipoDesempeno,
            'CheckDesempeno': vm.CheckDesempeno,
            'CheckCambioEquipos': vm.CheckCambioEquipos,
            'CheckEquiposDigitales': vm.CheckEquiposDigitales,
            'CheckCargaImagenes': vm.CheckCargaImagenes

          };
        } else {
          var obj = {
            'IdMemoriaTecnica': vm.IdMemoriaTecnica,
            'SAN': (vm.SAN) ? vm.SAN : 0,
            'Contrato': (vm.contrato) ? vm.contrato : 0,
            'Distribuidor': vm.distribuidor ? vm.distribuidor : '',
            'Instalador': vm.usuariosistema,
            'FechaVisita': (vm.fechasitio) ? vm.fechasitio : '', // $filter('date')(vm.fechasitio, 'yyyy-MM-dd') : '',
            'HoraLlegada': (vm.horallegada) ? vm.horallegada : '',
            'HoraSalida': (vm.horasalida) ? vm.horasalida : '',
            'SiteId': 0,
            'Cliente': (vm.cliente) ? vm.cliente : '',
            'Estado': (vm.estado) ? vm.estado : '',
            'Municipio': (vm.municipio) ? vm.municipio : '',
            'Localidad': (vm.localidad) ? vm.localidad : '',
            'Direccion': (vm.direccion) ? vm.direccion : '',
            'PersonaRecibe': (vm.recibe) ? vm.recibe : '',
            'Plataforma': (vm.plataforma) ? vm.plataforma : '',
            'Servicio': (vm.plan) ? vm.plan : '',
            'TipoServicio': (vm.tiposervicio) ? vm.tiposervicio.IdTipoServicio : 0,
            'Velocidad': (vm.velocidad) ? vm.velocidad : '',
            'DomicilioNotificacion': (vm.domicilionotificacion) ? vm.domicilionotificacion : '',
            'CodigoPostal': (vm.codigopostal) ? vm.codigopostal : '',
            'Telefono': vm.telefono,
            'Celular': vm.celular,
            'Latitud': vm.latitud,
            'Longitud': vm.longitud,
            'Beam': (vm.beam) ? vm.beam : '',
            'EstatusTecnico': (vm.estatustecnico) ? vm.estatustecnico.IdEstatusTecnico : '',
            'FechaActivacion': (vm.fechaactivacion) ? $filter('date')(vm.fechaactivacion, 'yyyyMMdd') : '19000101',
            'VCNeutroTierra': (vm.vcneutrotierra) ? vm.vcneutrotierra : '',
            'VCFaseTierra': (vm.vcfasetierra) ? vm.vcfasetierra : '',
            'VCFaseNeutro': (vm.vcfaseneutro) ? vm.vcfaseneutro : '',
            'VUPSNeutroTierra': (vm.upcneutrotierra) ? vm.upcneutrotierra : '',
            'VUPSFaseTierra': (vm.upcfasetierra) ? vm.upcfasetierra : '',
            'VUPSFaseNeutro': (vm.upcfaseneutro) ? vm.upcfaseneutro : '',
            'Modem': (vm.modem) ? vm.modem : "",
            'Antena': (vm.tamanoantena) ? vm.tamanoantena : "",
            'SQF': (vm.sqf) ? vm.sqf : "",
            'SQFInstalacion': (vm.SQFInstalacion) ? vm.SQFInstalacion : "",
            'Radio': (vm.serieradio) ? vm.serieradio : "",
            'Router': (vm.serierouter) ? vm.serierouter : "",
            'MarcaRouter': (vm.marcarouter) ? vm.marcarouter : "",
            'UPS': (vm.upsserie) ? vm.upsserie : "",
            'WiFi': '',
            'Instalacion': vm.Instalacion,
            'InstalacionDemo': vm.InstalacionDemo,
            'Apuntamiento': vm.Apuntamiento,
            'Reubicacion': vm.Reubicacion,
            'CambioComponentes': vm.CambioComponentes,
            'Mantenimiento': vm.Mantenimiento,
            'SiteSurvey': vm.SiteSurvey,
            'Detalles': (vm.detalleinstalacion) ? vm.detalleinstalacion : '',
            'Folio': (vm.numerofolio) ? vm.numerofolio : 0,
            'Clv_Orden': (vm.numeroorden) ? vm.numeroorden : 0,
            'IdUsuario': $localStorage.currentUser.idUsuario,
            'PersonaValidaServicio': vm.PersonaValidaServicio,
            'IdEstatusTecnico': (vm.estatustecnico) ? vm.estatustecnico.IdEstatusTecnico : 0,
            'IdTipoServicio': (vm.tiposervicio) ? vm.tiposervicio.IdTipoServicio : 0,
            'IdTecnico': (vm.instalador) ? vm.instalador.IdEntidad : 0,
            'AntenaSerie': (vm.antena) ? vm.antena.Descripcion : "",
            'IdAntena': 0,
            'CodigoEstado': vm.CodigodeEstado,
            'SQFVS': vm.SQFVS,
            'TransmitRate': vm.TransmitRate,
            'PowerAttenuation': vm.PowerAttenuation.Descripcion,
            'PruebaACP': vm.PruebaACP,
            'VoltajeComercialNT': vm.VoltajeComercialNT,
            'VoltajeComercialFT': vm.VoltajeComercialFT,
            'VoltajeComercialFN': vm.VoltajeComercialFN,
            'CheckDatosSitio': vm.CheckDatosSitio,
            'CheckValidacionSitio': vm.CheckValidacionSitio,
            'CheckTrabajosRealizados': vm.CheckTrabajosRealizados,
            'CheckMedicionesElectricas': vm.CheckMedicionesElectricas,
            'CheckDatosEquipoDesempeno': vm.CheckDatosEquipoDesempeno,
            'CheckDesempeno': vm.CheckDesempeno,
            'CheckCambioEquipos': vm.CheckCambioEquipos,
            'CheckEquiposDigitales': vm.CheckEquiposDigitales,
            'CheckCargaImagenes': vm.CheckCargaImagenes
          };
        }

        var file_options = [];
        var files = [];
        var tipos = [];

        //Imagenes generales
        vm.uploader.queue.forEach(function (f) {
          var options = {
            'IdImagen': 0,
            'Accion': 3,
            'Tipo': f._file.idtipo,
            'Nombre': f._file.name,
            'IdUsuario': $localStorage.currentUser.idUsuario
          };
          file_options.push(options);
          tipos.push(f._file.idtipo);
          files.push(f._file);

        });

        //Imagenes de pestaña de Valdiacion en Sitio
        vm.uploaderVS.queue.forEach(function (f) {

          var options = {
            IdImagen: 0,
            Accion: 1,
            Tipo: f._file.idtipo,
            Nombre: f._file.name,
            IdUsuario: $localStorage.currentUser.idUsuario
          };
          file_options.push(options);
          tipos.push(f._file.idtipo);
          files.push(f._file);

        });

        memoriaFactory.UpdateGuardaMemoriaTecnica(obj).then(function (response) {
          var equiposdig_ = [];
          vm.aparatosdigitales.forEach(function (item) {
            if (item.Opcion === 3) {
              equiposdig_.push(item);
            }
          });
          vm.digitales_eliminados.forEach(function (item) {
            equiposdig_.push(item);
          });
          var equipos_ = [];
          vm.cambios.forEach(function (item) {
            if (item.Opcion === 3) {
              equipos_.push(item);
            }
          });
          vm.cambios_eliminados.forEach(function (item) {
            equipos_.push(item);
          });

          memoriaFactory.GetGuardaEquiposDigital(equiposdig_).then(function (data) {

            memoriaFactory.GuardaEquiposSustituir(equipos_).then(function (result) {

              if (vm.notas.length > 0) {
                vm.notas.forEach(function (item) {
                  item.IdMemoriaTecnica = vm.IdMemoriaTecnica;
                });
                memoriaFactory.GetGuardaObservacionMemoriaTecnicaList(vm.notas).then(function (resp) { });
              }

              if (vm.notas_pestana.length > 0) {
                vm.notas_pestana.forEach(function (item) {
                  item.IdMemoriaTecnica = vm.IdMemoriaTecnica;
                });
                memoriaFactory.GetGuardaObservacionMemoriaTecnicaListPestana(vm.notas_pestana).then(function (resp) { });
              }

              memoriaFactory.GuardaImagenesMemoriaTecnica(files, vm.IdMemoriaTecnica, file_options, vm.Imagenes_eliminadas).then(function (data) {
                vm.uploader.clearQueue();
                vm.uploaderVS.clearQueue();
                ngNotify.set('La memoria técnica se ha guardado correctamente', 'success');
                $state.go('home.memoria.memoriastecnicas');
              });

            });
          });
        });

      }

      function detalle(det) {
        vm.NoSTB = det.NoSTB;
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
        var fecAux = moment(det.FechaActivacion, 'DD-MM-YYYY').toDate();
        //console.log('Prueba',fecAux);
        vm.fechaactivacion = new Date(fecAux);//$filter('date')(det.FechaActivacion, 'dd/MM/yyyy');//det.FechaActivacion;
        vm.fechasitio = det.FechaVisita;
        vm.numerofolio = det.Folio ? det.Folio : '';
        vm.mensajefolio = (vm.numerofolio.length > 0) ? 'Folio generado' : 'Generar Folio';
        vm.generafolio = (vm.numerofolio.length > 0) ? true : false;

        //console.log('det',det);
        vm.numerofolioVS = det.FolioVS ? det.FolioVS : '';
        vm.mensajefolioVS = (vm.numerofolioVS.length > 0) ? 'Folio generado' : 'Generar Folio Validación en Sitio';
        vm.generafolioVS = (vm.numerofolioVS.length > 0) ? true : false;
        vm.blockgenerafolioVS = (vm.numerofolioVS.length > 0) ? true : false;
        vm.blockgenerafolio = (vm.numerofolio.length > 0) || (vm.numerofolioVS.length == 0) ? true : false;

        //console.log('1',det);
        vm.horallegada = det.HoraLlegada;
        vm.horasalida = det.HoraSalida;
        vm.IdMemoriaTecnica = det.IdMemoriaTecnica;
        vm.IdUsuario = det.IdUsuario;
        vm.Instalacion = det.Instalacion;
        vm.InstalacionDemo = det.InstalacionDemo;
        vm.usuariosistema = det.Instalador;
        vm.latitud = det.Latitud;
        vm.localidad = det.Localidad;
        vm.longitud = det.Longitud;
        vm.Mantenimiento = det.Mantenimiento;
        vm.marcarouter = det.MarcaRouter;
        vm.modem = parseInt(det.Modem);
        vm.municipio = det.Municipio;
        vm.recibe = det.PersonaRecibe;
        vm.plataforma = det.Plataforma;
        vm.Reubicacion = det.Reubicacion;
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
        vm.contratocompania = det.contratocompania;
        vm.PersonaValidaServicio = det.PersonaValidaServicio;
        vm.Combo = det.Combo;
        vm.IdEstatusTecnico = det.IdEstatusTecnico;
        vm.IdTipoServicio = det.IdTipoServicio;
        vm.IdAntena = det.IdAntena;
        //console.log('2',det);
        if (vm.OrdenInstalacion) {
          vm.CambioDeEquipos = false;
          if (det.Proveedor == 'AZ3' || det.Proveedor == 'Norte' || det.Proveedor == 'AZ5') {
            vm.ActivaFechaActivacion = true;
          }
          else {
            vm.ActivaFechaActivacion = false;
          }
        }
        else {
          //console.log('3',det);
          vm.CambioDeEquipos = true;
          vm.ActivaFechaActivacion = false;
          vm.modem = det.Modem == undefined ? '' : det.Modem;
          vm.antena = det.AntenaSerie == undefined ? '' : det.Modem;
          vm.serierouter = det.Router == undefined ? '' : det.Modem;
          vm.tamanoantena = det.Antena == undefined ? '' : det.Modem;
          vm.upsserie = det.UPS == undefined ? '' : det.Modem;
          vm.serieradio = det.Radio == undefined ? '' : det.Modem;
        }
        if (vm.IdAntena == 0) {
          vm.MuestraComboAntena = false;
        }
        //console.log('4',det);
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

        vm.Estatus = det.Estatus;
        vm.CheckDatosSitio = det.CheckDatosSitio;
        vm.CheckValidacionSitio = det.CheckValidacionSitio;
        vm.CheckTrabajosRealizados = det.CheckTrabajosRealizados;
        vm.CheckMedicionesElectricas = det.CheckMedicionesElectricas;
        vm.CheckDatosEquipoDesempeno = det.CheckDatosEquipoDesempeno;
        vm.CheckDesempeno = det.CheckDesempeno;
        vm.CheckCambioEquipos = det.CheckCambioEquipos;
        vm.CheckEquiposDigitales = det.CheckEquiposDigitales;
        vm.CheckCargaImagenes = det.CheckCargaImagenes;
        //console.log(det);
        getTecnicos(vm.contratocompania.split('-')[1], det.IdTecnico, det.Modem, det.Radio, det.Router, det.AntenaSerie, det.UPS);
        vm.titulo = 'Edición de memoria técnica de servicio #' + vm.IdMemoriaTecnica;
      }

      function obtenfolio() {
        if (vm.generafolio) {
          //Tiene que tener todos los checks de pestanas
          if (vm.CheckDatosSitio && vm.CheckValidacionSitio && vm.CheckTrabajosRealizados
            && vm.CheckMedicionesElectricas
            && (vm.CheckDatosEquipoDesempeno || !vm.OrdenInstalacion)
            && (vm.CheckDesempeno || vm.OrdenInstalacion)
            && (vm.CheckCambioEquipos || !vm.CambioDeEquipos)
            && (vm.CheckEquiposDigitales || !vm.Combo)
            && vm.CheckCargaImagenes) {
            //Preguntamos si están seguros de generar folio
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/memorias/ModalPreguntaFolio.html',
              controller: 'ModalPreguntaFolioCtrl',
              controllerAs: '$ctrl',
              backdrop: 'static',
              keyboard: false,
              size: "md",
              resolve: {
                /*Lista: function () {
                  return vm.CambioDeEquipos;
                }*/
              }
            });
            modalInstance.result.then(function (item) {
              if (item) {
                memoriaFactory.GetGeneraFolioMemoriaTecnica(vm.IdMemoriaTecnica)
                  .then(function (response) {
                    var id = vm.IdMemoriaTecnica;
                    GetdataFire().then(function (result) {
                      result.forEach(function (item, index) {
                        if (parseInt(item.Id) === parseInt(id)) {
                          deleteFile(index).then(function (result) {
                          });
                        }
                      });
                    });
                    vm.numerofolio = response.GetGeneraFolioMemoriaTecnicaResult;
                    vm.mensajefolio = (vm.numerofolio.trim().length > 0) ? 'Folio generado' : 'Generar Folio';
                    vm.generafolio = (vm.numerofolio.trim().length > 0) ? true : false;
                    vm.blockgenerafolio = (vm.numerofolio.trim().length > 0) ? true : false;
                  });
              }
              else {
                vm.generafolio = false;
              }
            }, function () {
            });
          }
          else {
            vm.generafolio = false;
            ngNotify.set('No se ha dado check a todas las pestañas de la memoria técnica', 'warn');
          }
        }
      }

      function obtenfolioVS() {
        if (vm.generafolioVS) {
          /*var aux = {};
          aux.domicilionotificacion = vm.domicilionotificacion;
          aux.localidad = vm.localidad;
          aux.PersonaValidaServicio = vm.PersonaValidaServicio;
          aux.recibe = vm.recibe;
          aux.estatustecnico = vm.estatustecnico;
          aux.latitud = vm.latitud;
          aux.longitud = vm.longitud;
          aux.velocidad = vm.velocidad;
          aux.CodigodeEstado = vm.CodigodeEstado;
          aux.SQFVS = vm.SQFVS;
          aux.TransmitRate = vm.TransmitRate;
          aux.PowerAttenuation = vm.PowerAttenuation;
          aux.PruebaACP = vm.PruebaACP;
          aux.VoltajeComercialNT = vm.VoltajeComercialNT;
          aux.VoltajeComercialFT = vm.VoltajeComercialFT;
          aux.VoltajeComercialFN = vm.VoltajeComercialFN;
          console.log('aux',aux);*/

          //Vamos a validar que estén los datos requeridos para este folio
          /*if (vm.domicilionotificacion != undefined && vm.domicilionotificacion.length > 0 &&
            vm.localidad != undefined && vm.localidad.length > 0 &&
            vm.PersonaValidaServicio != undefined && vm.PersonaValidaServicio.length > 0 &&
            vm.recibe != undefined && vm.recibe.length > 0 &&
            vm.estatustecnico != undefined &&
            vm.latitud != undefined && vm.latitud.length > 0 &&
            vm.longitud != undefined && vm.longitud.length > 0 &&
            vm.velocidad != undefined && vm.velocidad.length > 0 &&
            vm.CodigodeEstado != undefined && vm.CodigodeEstado.length > 0 &&
            vm.SQFVS != undefined && vm.SQFVS.length > 0 &&
            vm.TransmitRate != undefined && vm.TransmitRate.length > 0 &&
            vm.PowerAttenuation != undefined &&
            vm.PruebaACP != undefined && vm.PruebaACP.length > 0 &&
            vm.VoltajeComercialNT != undefined && vm.VoltajeComercialNT.length > 0 &&
            vm.VoltajeComercialFT != undefined && vm.VoltajeComercialFT.length > 0 &&
            vm.VoltajeComercialFN != undefined && vm.VoltajeComercialFN.length > 0
          )*/
          if (vm.domicilionotificacion != '' &&
            vm.localidad != '' &&
            vm.PersonaValidaServicio != '' &&
            vm.recibe != '' &&
            vm.estatustecnico != undefined &&
            vm.latitud != '' &&
            vm.longitud != '' &&
            vm.velocidad != '' &&
            vm.CodigodeEstado != '' &&
            vm.SQFVS != '' &&
            vm.TransmitRate != '' &&
            vm.PowerAttenuation != undefined &&
            vm.PruebaACP != '' &&
            vm.VoltajeComercialNT != '' &&
            vm.VoltajeComercialFT != '' &&
            vm.VoltajeComercialFN != ''
          ) {
            //Checamos que haya al menos una imagen
            var existe = false;
            var salir = false;
            vm.tiposrespValidacion.forEach(function (tipoAux) {
              existe = false;
              vm.Lista_evidenciasVS.forEach(function (imgAux) {
                if (imgAux.Tipo_ == tipoAux.Nombre) {
                  existe = true;
                  return;
                }
              });
              if (!existe) {
                vm.generafolioVS = false;
                ngNotify.set('No se ha completado la información necesaria para generar el folio', 'warn');
                salir = true;
                return;
              }
            });
            if (salir) {
              return;
            }
            //Preguntamos si están seguros de generar folio
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/memorias/ModalPreguntaFolio.html',
              controller: 'ModalPreguntaFolioCtrl',
              controllerAs: '$ctrl',
              backdrop: 'static',
              keyboard: false,
              size: "md",
              resolve: {
                /*Lista: function () {
                  return vm.CambioDeEquipos;
                }*/
              }
            });
            modalInstance.result.then(function (item) {
              if (item) {
                memoriaFactory.GetGeneraFolioMemoriaTecnicaVS(vm.IdMemoriaTecnica)
                  .then(function (response) {
                    var id = vm.IdMemoriaTecnica;
                    /*GetdataFire().then(function (result) {
                      result.forEach(function (item, index) {
                        if (parseInt(item.Id) === parseInt(id)) {
                          deleteFile(index).then(function (result) {
                          });
                        }
                      });
                    });*/
                    vm.numerofolioVS = response.GetGeneraFolioMemoriaTecnicaVSResult;
                    vm.mensajefolioVS = (vm.numerofolioVS.trim().length > 0) ? 'Folio generado' : 'Generar Folio Validación en Sitio';
                    vm.generafolioVS = (vm.numerofolioVS.trim().length > 0) ? true : false;
                    vm.blockgenerafolioVS = (vm.numerofolioVS.trim().length > 0) ? true : false;
                    vm.blockgenerafolio = (vm.numerofolio.length > 0) || (vm.numerofolioVS.length == 0) ? true : false;
                  });
              }
              else {
                vm.generafolioVS = false;
              }
            }, function () {
            });
          }
          else {
            vm.generafolioVS = false;
            ngNotify.set('No se ha completado la información necesaria para generar el folio', 'warn');
            return;
          }
        }
      }

      function detalleTecnico() {
        vm.listModem = [];
        vm.listRadio = [];
        vm.listRouter = [];
        vm.listSTB = [];
        vm.listAntena = [];
        vm.aparatosdigitales = [];
        getApartos('', '', '', '', '', vm.instalador.IdEntidad);
      }




      var openLightboxModal =
        function (index) {
          Lightbox.openModal(vm.Lista_evidencias, index);
        };


      function eliminaNota(index) {
        if (index > -1) {
          vm.notas.splice(index, 1);
        }
      }

      function EliminaMemoria() {
        var parametros = {};
        parametros.IdMemoriaTecnica = vm.IdMemoriaTecnica;
        parametros.IdUsuario = $localStorage.currentUser.idUsuario;
        memoriaFactory.GetEliminaMemoriaTecnica(parametros).then(function (response) {
          if (response.GetEliminaMemoriaTecnicaResult > 0) {
            ngNotify.set('Solo es posible eliminar las memorias técnicas que no estén foliadas y la orden pendiente', 'error');
          }
          else {
            ngNotify.set('La memoria técnica se ha eliminado correctamente', 'success');
            $state.go('home.memoria.memoriastecnicas');
          }
        });
      }

      function EnviarRevisar() {
        var parametros = {};
        parametros.IdMemoriaTecnica = vm.IdMemoriaTecnica;
        parametros.Estatus = 'Revisión';
        memoriaFactory.GetActualizaEstatusMemoriaTecnica(parametros).then(function (response) {

          GetdataFire().then(function (result) {
            result.forEach(function (item, index) {
              if (parseInt(item.Id) === parseInt(vm.IdMemoriaTecnica) && item.Tipo == 11) {
                //console.log('item', item);
                deleteFile(index).then(function (result) {
                });
              }
            });
          });

          var ref = firebase.database().ref().child("messages");
          vm.messages = $firebaseArray(ref);
          vm.messages.$add({
            Id: vm.IdMemoriaTecnica,
            Fecha: moment().format("L"),
            Hora: moment().format("LT"),
            Mensaje: 'Se ha enviado a revisión memoria técnica',
            Tipo: 1,
            SAN: vm.SAN

          });
          ngNotify.set('La memoria técnica se ha enviado a revisión', 'success');
          $state.go('home.memoria.memoriastecnicas');
        });
      }

      function NotasPestana(Pestana) {
        /*console.log('vm.IdMemoriaTecnica',vm.IdMemoriaTecnica);
        console.log('Pestana',Pestana);
        console.log('vm.notas_pestana',vm.notas_pestana);
        console.log('vm.notas_pestana_ant',vm.notas_pestana_ant);*/
        //Preguntamos si están seguros de generar folio
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/memorias/ModalNotaPestana.html',
          controller: 'ModalNotaPestanaCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          size: "lg",
          resolve: {
            IdMemoriaTecnica: function () {
              return vm.IdMemoriaTecnica;
            },
            Pestana: function () {
              return Pestana;
            },
            notas_pestana: function () {
              return vm.notas_pestana;
            },
            notas_pestana_ant: function () {
              return vm.notas_pestana_ant;
            }
          }
        });
        modalInstance.result.then(function (Lista) {
          vm.notas_pestana = Lista;
        }, function () {
        });
      }

      function CheckPestanasDatosSitio() {
        if (vm.CheckDatosSitio) {
          vm.CheckDatosSitio = false;
        }
        else {
          vm.CheckDatosSitio = true;
        }
      }

      function CheckPestanasValidacionSitio() {
        if (vm.CheckValidacionSitio) {
          vm.CheckValidacionSitio = false;
        }
        else {
          vm.CheckValidacionSitio = true;
        }
      }

      function CheckPestanasTrabajosRealizados() {
        if (vm.CheckTrabajosRealizados) {
          vm.CheckTrabajosRealizados = false;
        }
        else {
          if (!vm.Instalacion && !vm.Mantenimiento && !vm.CambioComponentes &&
            !vm.SiteSurvey && !vm.InstalacionDemo && !vm.Reubicacion && !vm.Apuntamiento) {
            Notification({
              message: 'Se debe seleccionar por lo menos un tipo de trabajo realizado',
              title: 'Atención'
            }, 'warning');
            vm.CheckTrabajosRealizados = false;
          }
          else{
            vm.CheckTrabajosRealizados = true;
          }
        }
      }

      function CheckPestanasMedicionesElectricas() {
        if (vm.CheckMedicionesElectricas) {
          vm.CheckMedicionesElectricas = false;
        }
        else {
          if (!vm.vcneutrotierra || !vm.vcfasetierra || !vm.vcfaseneutro) {

            Notification({
              message: 'Hay información que no se ha capturado',
              title: 'Atención'
            }, 'warning');
            vm.CheckMedicionesElectricas = false;
          }
          else{
            vm.CheckMedicionesElectricas = true;
          }
        }
      }

      function CheckPestanasDatosEquipoDesempeno() {
        if (vm.CheckDatosEquipoDesempeno) {
          vm.CheckDatosEquipoDesempeno = false;
        }
        else {
          if (!vm.modem || !vm.serieradio || !vm.serierouter || !vm.marcarouter || !vm.tamanoantena || !vm.sqf || !vm.antena) {
            Notification({
              message: 'Hay información que no se ha capturado',
              title: 'Atención'
            }, 'warning');
            vm.CheckDatosEquipoDesempeno = false;
          }
          else{
            vm.CheckDatosEquipoDesempeno = true;
          }
        }
      }

      function CheckPestanasDesempeno() {
        if (vm.CheckDesempeno) {
          vm.CheckDesempeno = false;
        }
        else {
          vm.CheckDesempeno = true;
        }
      }

      function CheckPestanasCambioEquipos() {
        if (vm.CheckCambioEquipos) {
          vm.CheckCambioEquipos = false;
        }
        else {
          vm.CheckCambioEquipos = true;
        }
      }

      function CheckPestanasEquiposDigitales() {
        if (vm.CheckEquiposDigitales) {
          vm.CheckEquiposDigitales = false;
        }
        else {
          vm.CheckEquiposDigitales = true;
        }
      }

      function CheckPestanasCargaImagenes() {
        if (vm.CheckCargaImagenes) {
          vm.CheckCargaImagenes = false;
        }
        else {
          var tipos = vm.tiposresp;
          vm.uploader.queue.forEach(function (f) {
            tipos.forEach(function (item, index) {
              if (f._file.idtipo === item.IdTipo) {
                if (index > -1) {
                  tipos.splice(index, 1);
                }
              }
            })
          });

          if (tipos.length > 0) {
            Notification({
              message: 'No todos los rubros en la carga de imágenes estan completos',
              title: 'Atención'
            }, 'warning');
            vm.CheckCargaImagenes = false;
          }
          else{
            vm.CheckCargaImagenes = true;
          }
        }
      }

      function Rechazar() {
        var parametros = {};
        parametros.IdMemoriaTecnica = vm.IdMemoriaTecnica;
        parametros.Estatus = 'Rechazada';
        memoriaFactory.GetActualizaEstatusMemoriaTecnica(parametros).then(function (response) {

          GetdataFire().then(function (result) {
            result.forEach(function (item, index) {
              if (parseInt(item.Id) === parseInt(vm.IdMemoriaTecnica) && item.Tipo == 1) {
                //console.log('item', item);
                deleteFile(index).then(function (result) {
                });
              }
            });
          });
          //alert('sdf');
          var ref = firebase.database().ref().child("messages");
          vm.messages = $firebaseArray(ref);
          vm.messages.$add({
            Id: vm.IdMemoriaTecnica,
            Fecha: moment().format("L"),
            Hora: moment().format("LT"),
            Mensaje: 'Se ha rechazado la memoria técnica',
            Tipo: 11,
            SAN: vm.IdUsuario

          });
          ngNotify.set('La memoria técnica se ha rechazado', 'success');
          $state.go('home.memoria.memoriastecnicas');
        });
      }

      var vm = this;
      vm.eliminaNota = eliminaNota;
      vm.uploader = new FileUploader();
      vm.uploaderVS = new FileUploader();
      vm.id = $stateParams.id;
      initialData();
      vm.detalleTecnico = detalleTecnico;
      vm.openLightboxModal = openLightboxModal;
      vm.showguardar = true;
      vm.showeliminar = true;
      vm.seleccionImagen = true;
      vm.detalle = false;
      vm.guardar = guardar;
      vm.cambioAparato = cambioAparato;
      vm.cambios = [];
      vm.cambios_eliminados = [];
      vm.eliminaaparato = eliminaaparato;
      vm.Imagenes_eliminadas = [];
      vm.BorraImagen = BorraImagen;
      vm.BorraImagenVS = BorraImagenVS;
      vm.obtenfolio = obtenfolio;
      vm.obtenfolioVS = obtenfolioVS;
      vm.aparatosdigitales = [];
      vm.digitales_eliminados = [];
      vm.eliminaaparatodig = eliminaaparatodig;
      vm.addAparatodig = addAparatodig;
      vm.blockorden = true;
      vm.blockcontrato = true;
      vm.guardaNota = guardaNota;
      vm.notas = [];
      vm.notas_ant = [];
      vm.notas_pestana = [];
      vm.notas_pestana_ant = [];
      vm.permitecheck = $localStorage.currentUser.CheckMemoria;
      vm.permitecheckVS = $localStorage.currentUser.CheckValidacionSitio;
      vm.IdRol = $localStorage.currentUser.IdRol;
      vm.ActivaFechaActivacion = false;
      vm.CambioDeEquipos = false;
      vm.FiltrarLista = FiltrarLista;
      vm.MuestraComboAntena = true;
      vm.ActualizarDatosHughes = ActualizarDatosHughes;
      vm.EliminaMemoria = EliminaMemoria;
      vm.EnviarRevisar = EnviarRevisar;
      vm.NotasPestana = NotasPestana;

      vm.CheckDatosSitio = false;
      vm.CheckPestanasDatosSitio = CheckPestanasDatosSitio;
      vm.CheckValidacionSitio = false;
      vm.CheckPestanasValidacionSitio = CheckPestanasValidacionSitio;
      vm.CheckTrabajosRealizados = false;
      vm.CheckPestanasTrabajosRealizados = CheckPestanasTrabajosRealizados;
      vm.CheckMedicionesElectricas = false;
      vm.CheckPestanasMedicionesElectricas = CheckPestanasMedicionesElectricas;
      vm.CheckDatosEquipoDesempeno = false;
      vm.CheckPestanasDatosEquipoDesempeno = CheckPestanasDatosEquipoDesempeno;
      vm.CheckDesempeno = false;
      vm.CheckPestanasDesempeno = CheckPestanasDesempeno;
      vm.CheckCambioEquipos = false;
      vm.CheckPestanasCambioEquipos = CheckPestanasCambioEquipos;
      vm.CheckEquiposDigitales = false;
      vm.CheckPestanasEquiposDigitales = CheckPestanasEquiposDigitales;
      vm.CheckCargaImagenes = false;
      vm.CheckPestanasCargaImagenes = CheckPestanasCargaImagenes;

      vm.Rechazar = Rechazar;
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
      vm.uploader = new FileUploader({
        filters: [{
          name: "yourName1",
          fn: function (item) {
            var count = 0;
            var count2 = 0;
            vm.uploader.queue.forEach(function (f) {
              count += f._file.name === item.name ? 1 : 0;
              count2 += f._file.idtipo === vm.tipoimagen.IdTipo ? 1 : 0;
            });
            if (count > 0) {
              ngNotify.set("Un archivo con ese mismo nombre ya fue seleccionado", "warn");
              return false;
            }
            if (count2 > 1) {
              ngNotify.set("Solo se pueden subir 2 imagnes de un mismo rubro", "warn");
              return false;
            } else {
              return true;
            }
          }
        },


        ]
      });

      vm.uploaderVS = new FileUploader({
        filters: [{
          name: "yourName1",
          fn: function (item) {
            var count = 0;
            var count2 = 0;
            vm.uploader.queue.forEach(function (f) {
              count += f._file.name === item.name ? 1 : 0;
              count2 += f._file.idtipo === vm.tipoimagenValidacion.IdTipo ? 1 : 0;
            });
            if (count > 0) {
              ngNotify.set("Un archivo con ese mismo nombre ya fue seleccionado", "warn");
              return false;
            }
            if (count2 > 1) {
              ngNotify.set("Solo se pueden subir 2 imágenes de un mismo rubro", "warn");
              return false;
            } else {
              return true;
            }
          }
        },


        ]
      });

      vm.uploader.onAfterAddingFile = function (fileItem) {
        fileItem.file.idtipo = vm.tipoimagen.IdTipo;
        fileItem.file.tipo = vm.tipoimagen.Nombre;
        fileItem._file.idtipo = vm.tipoimagen.IdTipo;
        fileItem._file.tipo = vm.tipoimagen.Nombre;
        fileItem.IdUsuario = $localStorage.currentUser.idUsuario;
      };

      function FiltrarLista(Lista, Titulo) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/memorias/ModalFiltrarLista.html',
          controller: 'ModalFiltrarListaCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          size: "sm",
          resolve: {
            Lista: function () {
              return Lista;
            },
            Titulo: function () {
              return Titulo;
            }
          }
        });
        modalInstance.result.then(function (item) {
          if (Titulo == 'Series Módem') {
            vm.modem = item;
          }
          else if (Titulo == 'Series Antena') {
            vm.antena = item;
          }
          else if (Titulo == 'Series UPS') {
            vm.upsserie = item;
          }
          else if (Titulo == 'Series Radio') {
            vm.serieradio = item;
          }
          else if (Titulo == 'Series Router') {
            vm.serierouter = item;
          }
        }, function () {
        });
      }

      vm.uploaderVS.onAfterAddingFile = function (fileItem) {
        fileItem.file.idtipo = vm.tipoimagenValidacion.IdTipo;
        fileItem.file.tipo = vm.tipoimagenValidacion.Nombre;
        fileItem._file.idtipo = vm.tipoimagenValidacion.IdTipo;
        fileItem._file.tipo = vm.tipoimagenValidacion.Nombre;
        fileItem.IdUsuario = $localStorage.currentUser.idUsuario;
      };

      function ActualizarDatosHughes() {
        var parametros = {};
        parametros.Clv_Orden = vm.numeroorden;
        memoriaFactory.GetObtieneDatosHughes(parametros).then(function (result) {
          vm.SQFVS = result.GetObtieneDatosHughesResult.SQF;
          vm.CodigodeEstado = result.GetObtieneDatosHughesResult.CodigoEstado;
        });
      }
    });
