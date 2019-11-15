'use strict';
angular.module('softvFrostApp').controller('activacionCtrl', activacionCtrl);

function activacionCtrl(terminalFactory, $uibModal, $state, ngNotify, $filter, $stateParams, globalService, $interval, $window, $localStorage) {
  
  /// Abre las validaciones para activar una terminal
  this.$onInit = function () {
    if ($stateParams.ESN != undefined && $stateParams.ESN != '' && $stateParams.antenna_size != undefined && $stateParams.antenna_size != '') {
      $window.open('http://189.254.231.35/ovttool/#!/home/monitoreo/validation?esn=' + $stateParams.ESN, '_self');
    }
    if ($stateParams.ESN != undefined) {
      vm.ESN = $stateParams.ESN;
      vm.bockEsn = true;
      vm.ActivaControlesActivacion = true;
    }
    vm.MuestraInformacion = false;
    vm.ActivaControlesActivacion = false;
  }

  /// Realiza las modificaciones necesarias para activar la terminal
  function activarTerminal() {
    if (vm.PIN.length == 4) {
      if (vm.PINValidar == vm.PIN) {
        terminalFactory.getTerminalById(vm.SAN).then(function (data) {
          if (data.GetByTerminalResult.Estatus == 'Activa' || data.GetByTerminalResult.Estatus == 'Pendiente') {

            var parametros = {};
            parametros.telefono = vm.suscriptor.Telefono;
            parametros.SANCompleto = vm.Terminal.SANCompleto;
            parametros.SAN = vm.Terminal.SAN;
            parametros.ESN = vm.ESN;
            parametros.IdUsuario = $localStorage.currentUser.idUsuario;
            terminalFactory.hughesActivarTerminal(parametros).then(function (hughesData0) {

              if (hughesData0.Error == "ERROR") {
                ngNotify.set('Error al activar la terminal', 'error');
              }
              else {
                terminalFactory.getTerminalById(vm.SAN).then(function (data2) {
                  vm.Terminal = data2.GetByTerminalResult;

                  vm.MuestraInformacion = true;

                  var obj = {};
                  obj.SAN = vm.Terminal.SANCompleto;
                  terminalFactory.hughesConsumoDeTerminal(obj).then(function (hughesData) {
                    vm.Consumo = {};
                    vm.Consumo.Disponible = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.AnyTimeBandwidthAvailable;
                    vm.Consumo.Consumido = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.AnyTimeBandwidthUsed;
                    vm.Consumo.DiaRelleno = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.RefillDayOfMonth;
                    vm.Token = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.TokenBandwidthAvailable;

                    terminalFactory.hughesFapStatus(obj).then(function (hughesData2) {
                      if (hughesData2.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == -1) {
                        vm.FapStatus = "Not Activated";
                      } else if (hughesData2.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 0) {
                        vm.FapStatus = "Unthrottled";
                      } else if (hughesData2.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 1) {
                        vm.FapStatus = "Throttled";
                      }

                      var paramAux = {};
                      paramAux.SAN = vm.Terminal.SAN;
                      terminalFactory.GetDatosIPTerminal(paramAux).then(function (data) {
                        vm.DatosIP = data.GetDatosIPTerminalResult;
                        ngNotify.set('Terminal activada exitosamente', 'success');
                      });
                    });
                  });
                });

                //vm.PIN = "";
                //vm.Suscriptor = '';
                //vm.Referencia = '';
              }
              //Deshabilitamos el botón después de cada activar por 30 sec
              var SECOND = 1000; // PRIVATE
              var MINUTE = SECOND * 60;
              var HOUR = MINUTE * 60;
              var DAY = HOUR * 24;
              vm.ActivarBoton = false;
              vm.ActivaControlesActivacion = false;
              vm.count = 0;
              var oneTimer = $interval(function () {
                if (vm.count >= 30) {
                  $interval.cancel(oneTimer);
                  vm.ActivarBoton = true;
                } else {
                  vm.count++;
                }
              }, 1 * SECOND);
            });
          }
          else {
            ngNotify.set('La terminal no se encuentra en Estatus Pendiente', 'error');
          }
        });
      }
      else {
        ngNotify.set('El PIN capturado no es correcto, favor de verificarlo', 'error');
      }
    }
    else {
      ngNotify.set('El PIN debe ser de cuatro dígitos', 'error');
    }
  }
  /*
    function activarTerminal() {
  
  
      terminalFactory.getTerminalById(vm.SAN).then(function (data2) {
        vm.Terminal = data2.GetByTerminalResult;
  
        vm.MuestraInformacion = true;
  
        var obj = {};
        obj.SAN = vm.Terminal.SANCompleto;
        terminalFactory.hughesConsumoDeTerminal(obj).then(function (hughesData) {
          vm.Consumo = {};
          vm.Consumo.Disponible = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.AnyTimeBandwidthAvailable;
          vm.Consumo.Consumido = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.AnyTimeBandwidthUsed;
          vm.Consumo.DiaRelleno = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.RefillDayOfMonth;
          vm.Token = hughesData.envEnvelope.envBody.GetBandwidthInfoResponseMsg.TokenBandwidthAvailable;
  
          terminalFactory.hughesFapStatus(obj).then(function (hughesData2) {
            if (hughesData2.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == -1) {
              vm.FapStatus = "Not Activated";
            } else if (hughesData2.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 0) {
              vm.FapStatus = "Unthrottled";
            } else if (hughesData2.envEnvelope.envBody.GetFAPStatusResponseMsg.FAPStatus == 1) {
              vm.FapStatus = "Throttled";
            }
  
            var paramAux = {};
            paramAux.SAN = vm.Terminal.SAN;
            terminalFactory.GetDatosIPTerminal(paramAux).then(function (data) {
              vm.DatosIP = data.GetDatosIPTerminalResult;
              ngNotify.set('Terminal activada exitosamente', 'success');
            });
          });
        });
      });
  
  
    }
  */

  /* Versión anterior de activación
  function activarTerminal() {
 
    terminalFactory.getTerminalById(vm.SAN).then(function (data) {
      if (data.GetByTerminalResult.Estatus === 'Activa' || data.GetByTerminalResult.Estatus == 'Pendiente') {
 
        var parametros = new Object();
        parametros.telefono = vm.suscriptor.Telefono;
        parametros.SAN = vm.Terminal.SANCompleto;
        parametros.ESN = vm.ESN;
        terminalFactory.hughesActivarTerminal(parametros).then(function (hughesData) {
          //Guarda el movimiento
          var Obj2 = new Object();
          Obj2.objMovimiento = new Object();
          Obj2.objMovimiento.SAN = vm.Terminal.SAN;
          Obj2.objMovimiento.IdComando = 9;//Hardcodeado a la tabla de Comando
          Obj2.objMovimiento.IdUsuario = 0;
          Obj2.objMovimiento.IdTicket = 0;
          Obj2.objMovimiento.OrderId = 0;
          vm.fechaAuxiliar = new Date();
          Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
          Obj2.objMovimiento.Mensaje = hughesData.envEnvelope.envBody.cmcActivationResponseMsg.MessageText;
          Obj2.objMovimiento.IdOrigen = 2;//Hardcodeado a la tabla de OrigenMovimiento
          Obj2.objMovimiento.Detalle1 = '';
          Obj2.objMovimiento.Detalle2 = '';
 
          //Vamos a procesar dependiendo del status obtenido de hughes
          if (hughesData.envEnvelope.envBody.cmcActivationResponseMsg.Status == "FAILED") {
            ngNotify.set('Error al activar la terminal', 'error');
            //Ponemos el movimiento como no exitoso
            Obj2.objMovimiento.Exitoso = 0;
          }
          else {
            //Actualiza el estatus en la base en caso de que haya activado en Hughes
            var Obj3 = new Object();
            Obj3.objTerminal = new Object();
            Obj3.objTerminal.SAN = vm.Terminal.SAN;
            Obj3.objTerminal.IdSuscriptor = vm.Terminal.IdSuscriptor;
            Obj3.objTerminal.IdServicio = vm.Terminal.IdServicio;
            Obj3.objTerminal.Latitud = vm.Terminal.Latitud;
            Obj3.objTerminal.Longitud = vm.Terminal.Longitud;
            Obj3.objTerminal.Estatus = 'Activa';
            Obj3.objTerminal.FechaAlta = vm.Terminal.FechaAlta;
            Obj3.objTerminal.FechaSuspension = vm.Terminal.FechaSuspension;
            Obj3.objTerminal.ESN = vm.ESN;
            Obj3.objTerminal.Comentarios = vm.Terminal.Comentarios;
 
            terminalFactory.updateTerminal(Obj3).then(function (data) {
              ngNotify.set('La terminal se ha activado correctamente', 'success');
            });
            vm.PIN = "";
            vm.SAN = "";
            vm.Suscriptor = '';
            vm.Referencia = '';
            //Ponemos el movimiento como  exitoso
            Obj2.objMovimiento.Exitoso = 1;
          }
          terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
            //Deshabilitamos el botón después de cada activar por 30 sec
            var SECOND = 1000; // PRIVATE
            var MINUTE = SECOND * 60;
            var HOUR = MINUTE * 60;
            var DAY = HOUR * 24;
            vm.ActivarBoton = false;
            vm.count = 0;
            var oneTimer = $interval(function () {
              if (vm.count >= 30) {
                $interval.cancel(oneTimer);
                vm.ActivarBoton = true;
              } else {
                vm.count++;
              }
            }, 1 * SECOND);
 
          });
        });
      }
      else {
        ngNotify.set('La terminal no se encuentra en Estatus Pendiente', 'error');
      }
    });
 
  }
  */

  /// valida si es posible la activacion de la terminal
  function validarSAN() {
    //Nos traemos los datos de la terminal
    var obj = {};
    obj.SAN = vm.SAN;
    terminalFactory.GetValidaTerminalActivacion(obj).then(function (data) {
      console.log('terminal', data);
      if (data.GetValidaTerminalActivacionResult == null) {
        vm.PIN = "";
        ngNotify.set('No existe una terminal con el SAN ingresado', 'error');
      } else {
        if (data.GetValidaTerminalActivacionResult.Error == false) {
          vm.Terminal = data.GetValidaTerminalActivacionResult;
          vm.Referencia = vm.Terminal.Comentarios;

          //ngNotify.set('La terminal está Activa, solo debe activar si la terminal tiene activado Swap', 'info');

          if (vm.Terminal.Estatus == 'Activa') {
            ngNotify.set('La terminal está Activa, solo debe activar si la terminal tiene activado Swap', 'info');
          }
          //Nos traemos los datos del cliente para obtener el PIN
          terminalFactory.getSuscriptorById(vm.Terminal.IdSuscriptor).then(function (data) {
            vm.suscriptor = data.GetSuscriptorResult;
            vm.Suscriptor = vm.suscriptor.Nombre + ' ' + vm.suscriptor.Apellido;
            //El PIN son los últimos cuatro dígitos del teléfono del cliente
            vm.PINValidar = vm.suscriptor.Telefono.substring(6, 10);
            vm.Referencia = vm.suscriptor.Referencia;
            vm.ActivaControlesActivacion = true;
          });

        }
        else {
          ngNotify.set(data.GetValidaTerminalActivacionResult.Mensaje, 'error');
          vm.ActivaControlesActivacion = false;
        }
      }
    });
  }

  /// Verifica los SAN compuestos 
  function hughesGetSanCompuesto(obj) {
    var a = obj.toString();
    var i;
    for (i = a.length; i < 9; i++) {
      a = '0' + a;
    }
    return globalService.getType() + a;
  };

  var vm = this;
  vm.activarTerminal = activarTerminal;
  vm.validarSAN = validarSAN;
  vm.bockEsn = false;
  vm.ActivarBoton = true;
  vm.Referencia = '';
  vm.Suscriptor = '';
}
