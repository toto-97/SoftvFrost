'use strict';
angular.module('softvFrostApp').controller('activacionCtrl', activacionCtrl);

function activacionCtrl(terminalFactory, $uibModal, $state, ngNotify, $filter, $stateParams,globalService) {
  this.$onInit = function () {
    if ($stateParams.esn != undefined) {
      vm.ESN = $stateParams.esn;
      vm.bockEsn = true;
    }
  }

  function activarTerminal() {
    //console.log('Prueba');
    terminalFactory.getTerminalById(vm.SAN).then(function (data) {
      if (data.GetByTerminalResult.Estatus == 'Activa' || data.GetByTerminalResult.Estatus == 'Pendiente') {
        //Formamos el objeto para mandarlo al servicio
        var parametros = new Object();
        parametros.telefono = vm.suscriptor.Telefono;
        parametros.SAN = hughesGetSanCompuesto(vm.Terminal.SAN);
        //console.log(parametros.SAN);
        parametros.ESN = vm.ESN;
        terminalFactory.hughesActivarTerminal(parametros).then(function (hughesData) {
          console.log(hughesData);
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
            console.log(Obj3);
            terminalFactory.updateTerminal(Obj3).then(function (data) {
              ngNotify.set('La terminal se ha activado correctamente', 'success');
            });
            vm.PIN = "";
            vm.SAN = "";
            //Ponemos el movimiento como  exitoso
            Obj2.objMovimiento.Exitoso = 1;
          }
          terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
          });
        });
      }
      else
      {
        ngNotify.set('La terminal no se encuentra en Estatus Pendiente', 'error');
      }
    });
  }

  function validarSAN() {
    //Nos traemos los datos de la terminal
    terminalFactory.getTerminalById(vm.SAN).then(function (data) {
      if (data.GetByTerminalResult == null) {
        vm.PIN = "";
        ngNotify.set('No existe una terminal con el SAN ingresado', 'error');
      } else {
        vm.Terminal = data.GetByTerminalResult;
        if (vm.Terminal.Estatus == 'Activa' || vm.Terminal.Estatus == 'Pendiente') {
          if (vm.Terminal.Estatus == 'Activa') {
            ngNotify.set('La terminal está Activa, solo debe activar si la terminal tiene activado Swap', 'info');
          }
          //Nos traemos los datos del cliente para obtener el PIN
          terminalFactory.getSuscriptorById(vm.Terminal.IdSuscriptor).then(function (data) {
            vm.suscriptor = data.GetSuscriptorResult;
            //El PIN son los últimos cuatro dígitos del teléfono del cliente
            vm.PIN = vm.suscriptor.Telefono.substring(6, 10);
          });
        }
        else {
          vm.PIN = "";
          ngNotify.set('La terminal no se encuentra en Estatus Pendiente', 'error');
        }
      }
    });
  }

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
}
