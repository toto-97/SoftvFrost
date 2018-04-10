'use strict';
angular.module('softvFrostApp').controller('editaPoolsCtrl', editaPoolsCtrl);

function editaPoolsCtrl($state, ngNotify, $timeout, configuracionIPFactory, $stateParams) {
    var vm = this;
    vm.EliminaPool = EliminaPool;
    this.$onInit = function () {
        var params = {};
        params.Clv_Pool = $stateParams.id
        configuracionIPFactory.obtieneDatosPool(params).then(function (data) {           
            vm.IP = data.GetObtieneDatosPoolListResult[0].IP;
            vm.MascaraRed = data.GetObtieneDatosPoolListResult[0].MascaraRed;
            vm.Servicio = data.GetObtieneDatosPoolListResult[0].Servicio;
            vm.Beam = data.GetObtieneDatosPoolListResult[0].Beam;
            vm.IPv6 = data.GetObtieneDatosPoolListResult[0].IPv6;
            vm.MascaraIPv6  = data.GetObtieneDatosPoolListResult[0].MascaraIPv6;
            vm.MascaraRed4Terminal = data.GetObtieneDatosPoolListResult[0].MascaraRed4Terminal;
            vm.MascaraRed6Terminal = data.GetObtieneDatosPoolListResult[0].MascaraRed6Terminal;
            configuracionIPFactory.obtieneIPsPool(params).then(function (data) {
                vm.rowCollection = data.GetObtieneIPsPoolListResult;
            });
        });
    }

    function ValidateIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true)
        }
        return (false)
    }

    function EliminaPool() {
        var params = {};
        params.Clv_Pool = $stateParams.id;
        configuracionIPFactory.eliminaPoolIP(params).then(function (data) {
            if(data.GetEliminaPoolIPListResult[0].Error === 0){
                $state.go('home.configuracionip.pools');
                ngNotify.set('Pool eliminado exitosamente', 'success');
            }
            else{
                ngNotify.set(data.GetEliminaPoolIPListResult[0].Mensaje, 'error');
            }
        });
    }

}
