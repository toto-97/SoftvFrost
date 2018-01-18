'use strict';
angular.module('softvFrostApp').controller('nuevoPoolsCtrl', nuevoPoolsCtrl);

function nuevoPoolsCtrl($state, ngNotify, $timeout, configuracionIPFactory) {
    var vm = this;
    vm.GuardaPool = GuardaPool;
    this.$onInit = function () {
        configuracionIPFactory.GetBeamList().then(function (data) {
            vm.Beams = data.GetBeamListResult;
        });
        configuracionIPFactory.getServicioList().then(function (data) {
            vm.Servicios = data.GetServicioListResult;
            var objTodos = {
                BaseRemoteIp: null,
                BaseIdUser: 0,
                IdServicio: 0,
                Nombre: "Free",
                Op: 'Null'
            }
            vm.Servicios.push(objTodos);
        });
    }

    function ValidateIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true)
        }
        return (false)
    }

    function GuardaPool() {
        if (ValidateIPaddress(vm.IP)) {
            if (vm.MascaraRed > 0 && vm.MascaraRed <= 32) {
                var parametros = {};
                var ip = vm.IP.split('.');
                parametros.IP1 = ip[0];
                parametros.IP2 = ip[1];
                parametros.IP3 = ip[2];
                parametros.IP4 = ip[3];
                parametros.MascaraRed = vm.MascaraRed;
                parametros.Beam = vm.Beam.BeamId;
                parametros.IdServicio = vm.Servicio.IdServicio;
                parametros.IPv6 = vm.IPv6;
                parametros.MascaraIPv6 = vm.MascaraIPv6;
                configuracionIPFactory.guardaPool(parametros).then(function (data) {
                    console.log(data);
                    if (data.GetGuardaPoolListResult[0].Error === 1) {
                        ngNotify.set(data.GetGuardaPoolListResult[0].Mensaje, 'error');
                    }
                    else {
                        $state.go('home.configuracionip.pools');
                        ngNotify.set('Nuevo Pool guardado exitosamente', 'success');
                    }
                });
            }
            else {
                ngNotify.set('Introduce una Máscara de Red válida', 'error');
            }
        }
        else {
            ngNotify.set('Introduce una IP válida', 'error');
        }
    }

}
