'use stric';
angular.module('softvFrostApp').controller('DetalleMovimientoCtrl', DetalleMovimientoCtrl);

function DetalleMovimientoCtrl($uibModalInstance, movimiento, terminalFactory, $filter, ngNotify) {
    var vm = this;
    vm.cancel = cancel;
    vm.CancelarMovimiento = CancelarMovimiento;

    /// Obtien los detalles de los movimiento hechos
    this.$onInit = function () {
        terminalFactory.detalleMovimiento(movimiento.IdMovimiento).then(function (data) {

            vm.movimiento = data.GetDeepMovimientoResult;
            //console.log('vm.movimiento', vm.movimiento);
        });
        terminalFactory.sigleMovimiento(movimiento.IdMovimiento).then(function (data) {

            vm.detalles = data.GetDetalleMovimientoIdListResult;
            //console.log('vm.detalles', vm.detalles);
        });
    }

    /// Cancela la consulta
    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    /// Cancela y borra un movimiento seleccionado
    function CancelarMovimiento() {
        var parametros = {};
        parametros.SAN = vm.movimiento.SAN;
        parametros.OrderId = vm.movimiento.OrderId; //Status hardcodeado de hughes
        terminalFactory.hughesCancelarCambioServicio(parametros).then(function (hughesData) {
            if (hughesData.StandardResponse.OrderId == 0) {
                //Guarda el movimiento sin OrderID
                var Obj2 = {};
                Obj2.objMovimiento = {};
                Obj2.objMovimiento.SAN = vm.movimiento.SAN;
                Obj2.objMovimiento.IdComando = 8; //Hardcodeado a la tabla de Comando
                Obj2.objMovimiento.IdUsuario = 0;
                Obj2.objMovimiento.IdTicket = 0;
                Obj2.objMovimiento.OrderId = 0;
                vm.fechaAuxiliar = new Date();
                Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                Obj2.objMovimiento.Detalle1 = vm.movimiento.IdMovimiento;
                Obj2.objMovimiento.Detalle2 = '';
                Obj2.objMovimiento.Exitoso = 0;
                terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
                    ngNotify.set('Error al cancelar el comando. Consulte el movimiento para más información', 'error');
                });
            } else {
                //Guarda el movimiento con OrderId
                var Obj2 = {};
                Obj2.objMovimiento = {};
                Obj2.objMovimiento.SAN = vm.movimiento.SAN;
                Obj2.objMovimiento.IdComando = 8; //Hardcodeado a la tabla de Comando
                Obj2.objMovimiento.IdUsuario = 0;
                Obj2.objMovimiento.IdTicket = 0;
                Obj2.objMovimiento.OrderId = hughesData.StandardResponse.OrderId;
                vm.fechaAuxiliar = new Date();
                Obj2.objMovimiento.Fecha = $filter('date')(vm.fechaAuxiliar, 'dd/MM/yyyy HH:mm:ss');
                Obj2.objMovimiento.Mensaje = hughesData.StandardResponse.Message;
                Obj2.objMovimiento.IdOrigen = 2; //Hardcodeado a la tabla de OrigenMovimiento
                Obj2.objMovimiento.Detalle1 = vm.movimiento.IdMovimiento;
                Obj2.objMovimiento.Detalle2 = '';
                Obj2.objMovimiento.Exitoso = 1;
                terminalFactory.addMovimiento(Obj2).then(function (dataMovimiento) {
                    ngNotify.set('Comando cancelado correctamente', 'success');
                });
            }
        });
    }
}