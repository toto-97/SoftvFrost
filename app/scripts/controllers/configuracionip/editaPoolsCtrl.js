'use strict';
angular.module('softvFrostApp').controller('editaPoolsCtrl', editaPoolsCtrl);

function editaPoolsCtrl($state, ngNotify, $timeout, configuracionIPFactory, $stateParams) {
    var vm = this;
    vm.EliminaPool = EliminaPool;
    vm.GuardaPool = GuardaPool;
    vm.AgregarServicio = AgregarServicio;
    vm.EliminaServicio = EliminaServicio;
    vm.ServiciosAsignados = [];
    vm.ContieneFree = false;

    /// Funcion inicial para obtener los datos del pool para el html
    this.$onInit = function () {
        var params = {};
        params.Clv_Pool = $stateParams.id;
        vm.Clv_Pool = $stateParams.id;
        configuracionIPFactory.GetBeamList().then(function (data) {
            vm.Beams = data.GetBeamListResult;
            configuracionIPFactory.obtieneDatosPool(params).then(function (data) {
                vm.IP = data.GetObtieneDatosPoolListResult[0].IP;
                vm.MascaraRed = data.GetObtieneDatosPoolListResult[0].MascaraRed;
                vm.Servicio = data.GetObtieneDatosPoolListResult[0].Servicio;
                //vm.Beam = data.GetObtieneDatosPoolListResult[0].Beam;
                vm.Beams.forEach(function (item, index) {
                    if (item.BeamId == data.GetObtieneDatosPoolListResult[0].Beam) {
                        vm.Beam = item;
                    }
                });
                vm.IPv6 = data.GetObtieneDatosPoolListResult[0].IPv6;
                vm.MascaraIPv6 = data.GetObtieneDatosPoolListResult[0].MascaraIPv6;
                vm.MascaraRed4Terminal = data.GetObtieneDatosPoolListResult[0].MascaraRed4Terminal;
                vm.MascaraRed6Terminal = data.GetObtieneDatosPoolListResult[0].MascaraRed6Terminal;
                var params2 = {};
                params2.Clv_Pool = vm.Clv_Pool;
                configuracionIPFactory.GetObtieneServiciosPoolIP(params).then(function (data) {
                    vm.ServiciosAsignados = data.GetObtieneServiciosPoolIPResult;
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
                });
            });
        });
    }

    /// Guarda un servicio y mandda un mensaje de exito
    function AgregarServicio() {
        if (vm.Servicio != undefined) {
            var bnd = true;
            vm.ServiciosAsignados.forEach(function (item, index) {
                if (item.IdServicio == vm.Servicio.IdServicio) {
                    bnd = false;
                }
            });
            if (bnd) {
                if (vm.Servicio.IdServicio == 0 && vm.ServiciosAsignados.length == 0) {
                    vm.ContieneFree = true;
                }
                else if (vm.Servicio.IdServicio == 0 && vm.ServiciosAsignados.length > 0) {
                    ngNotify.set('No es posible asignar un servicio Free si hay más servicios en la lista', 'warn');
                    return;
                }
                else if (vm.Servicio.IdServicio > 0 && vm.ContieneFree) {
                    ngNotify.set('No es posible agregar otro servicio si ya se asignó un servicio Free', 'warn');
                    return;
                }
                vm.ServiciosAsignados.push(vm.Servicio);
            }
            else {
                ngNotify.set('El servicio seleccionado ya se encuentra en la lista', 'warn');
            }
        }
    }

    /// Busca el servicio para eliminarlo
    function EliminaServicio(Servicio) {
        if (Servicio.IdServicio == 0) {
            vm.ContieneFree = false;
        }
        var indexAux = 0;
        vm.ServiciosAsignados.forEach(function (item, index) {
            if (item.IdServicio == Servicio.IdServicio) {
                indexAux = index;
                return;
            }
        });
        vm.ServiciosAsignados.splice(indexAux, 1);
    }

    /// Valida la IP Adress 
    function ValidateIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true)
        }
        return (false)
    }

    /// Elimina los datos de un pool
    function EliminaPool() {
        var params = {};
        params.Clv_Pool = $stateParams.id;
        configuracionIPFactory.eliminaPoolIP(params).then(function (data) {
            if (data.GetEliminaPoolIPListResult[0].Error === 0) {
                $state.go('home.configuracionip.pools');
                ngNotify.set('Pool eliminado exitosamente', 'success');
            }
            else {
                ngNotify.set(data.GetEliminaPoolIPListResult[0].Mensaje, 'error');
            }
        });
    }

    /// Actialuza los datos del pool
    function GuardaPool() {
        if (ValidateIPaddress(vm.IP)) {
            if (vm.MascaraRed > 0 && vm.MascaraRed <= 32) {
                if(vm.ServiciosAsignados.length > 0) {
                    var ServiciosAux = [];
                    vm.ServiciosAsignados.forEach(function (item, index) {
                        ServiciosAux.push(item.IdServicio);
                    });
                    var parametros = {};
                    var ip = vm.IP.split('.');
                    parametros.Clv_Pool = vm.Clv_Pool;
                    parametros.IP1 = ip[0];
                    parametros.IP2 = ip[1];
                    parametros.IP3 = ip[2];
                    parametros.IP4 = ip[3];
                    parametros.MascaraRed = vm.MascaraRed;
                    parametros.Beam = vm.Beam.BeamId;
                    parametros.IdServicio = vm.Servicio.IdServicio;
                    parametros.IPv6 = vm.IPv6;
                    parametros.MascaraIPv6 = vm.MascaraIPv6;
                    parametros.MascaraRed4Terminal = vm.MascaraRed4Terminal;
                    parametros.MascaraRed6Terminal = vm.MascaraRed6Terminal;
                    parametros.Servicios = ServiciosAux;
                    console.log(parametros);
                    configuracionIPFactory.GetEditaPool(parametros).then(function (data) {
                        if (data.GetEditaPoolResult[0].Error === 1) {
                            ngNotify.set(data.GetEditaPoolResult[0].Mensaje, 'error');
                        }
                        else {
                            $state.go('home.configuracionip.pools');
                            ngNotify.set('Pool editado exitosamente', 'success');
                        }
                    });
                }
                else {
                    ngNotify.set('Agrega al menos un servicio', 'error');
                }
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
