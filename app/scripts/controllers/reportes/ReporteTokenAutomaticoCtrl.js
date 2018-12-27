'use strict';
angular.module('softvFrostApp').controller('ReporteTokenAutomaticoCtrl', ReporteTokenAutomaticoCtrl);

function ReporteTokenAutomaticoCtrl($uibModal, $state, $stateParams, reportesFactory, usuarioFactory, ngNotify) {
    this.$onInit = function () {
        vm.PlazasSeleccionadas = [];
        usuarioFactory.GetDistribuidores().then(function (data) {
            vm.Distribuidores = data.GetDistribuidoresResult;
        });
    }

    function ObtienePlazas() {
        usuarioFactory.GetPlazas(vm.distribuidor.Clave).then(function (data) {
            vm.Plazas = data.GetPlazasResult;
            vm.PlazasSeleccionadas = [];
        });
    }

    function GeneraReporte() {
        if((vm.FechasActivo && (vm.FechaInicio == undefined || vm.FechaFin == undefined)) || (vm.DistribuidorActivo && vm.PlazasSeleccionadas.length == 0))
        {
            ngNotify.set('Es necesario llenar los datos de los filtros seleccionados', "error");
        }
        else{
            var parametros = {};
            parametros.Companias = [];
            parametros.FCompanias = vm.DistribuidorActivo;
            if (vm.DistribuidorActivo) {
                vm.PlazasSeleccionadas.forEach(function (item, index) {
                    parametros.Companias.push(item.Clave);
                });
            }
            else {
                parametros.Companias.push(0);
            }

            parametros.FConCobro = vm.CobroActivo;
            parametros.ConCobro = vm.ConCobro == undefined ? false : vm.ConCobro;

            parametros.FExitoso = vm.AsignadoActivo;
            parametros.Exitoso = vm.Asignado == undefined ? false : vm.Asignado;

            parametros.FFechas = vm.FechasActivo;
            if (vm.FechasActivo) {
                parametros.FechaInicio = vm.FechaInicio;
                parametros.FechaFin = vm.FechaFin;
            }
            else {
                parametros.FechaInicio = '19000101';
                parametros.FechaFin = '19000101';
            }
            reportesFactory.GetReporteTokenAutomatico(parametros).then(function (data) {
                //console.log('data', data);
                vm.resultados = data.GetReporteTokenAutomaticoResult;
                vm.resultados.forEach(function (item, index) {
                    if (item.ConCobro == "True") {
                        item.ConCobro = true;
                    }
                    else{
                        item.ConCobro = false;
                    }
                });
            });
        }
    }

    function AgregaPlaza(Clave) {
        var indexAux = 0;
        vm.Plazas.forEach(function (item, index) {
            if (item.Clave == Clave) {
                indexAux = index;
                vm.PlazasSeleccionadas.push(item);
            }
        });
        vm.Plazas.splice(indexAux, 1);
    }

    function QuitarPlaza(Clave) {
        var indexAux = 0;
        vm.PlazasSeleccionadas.forEach(function (item, index) {
            if (item.Clave == Clave) {
                indexAux = index;
                vm.Plazas.push(item);
            }
        });
        vm.PlazasSeleccionadas.splice(indexAux, 1);
    }

    function TodasPlazas() {
        vm.Plazas.forEach(function (item, index) {
            vm.PlazasSeleccionadas.push(item);
        });
        vm.Plazas = [];
    }

    var vm = this;
    vm.GeneraReporte = GeneraReporte;
    vm.DistribuidorActivo = false;
    vm.CobroActivo = false;
    vm.AsignadoActivo = false;
    vm.FechasActivo = false;
    vm.Fap = false;
    vm.AgregaPlaza = AgregaPlaza;
    vm.QuitarPlaza = QuitarPlaza;
    vm.TodasPlazas = TodasPlazas;

    vm.csvheader = ['Plaza',
        'Compania',
        'Contrato',
        'Cliente',
        'FechaToken',
        'Precio',
        'Servicio',
        'ConCobro',
        'Ticket',
        'Observaciones'];
    vm.csvorder = ['Plaza',
        'Compania',
        'Contrato',
        'Cliente',
        'FechaToken',
        'Precio',
        'Servicio',
        'ConCobro',
        'Ticket',
        'Observaciones'];
    vm.ObtienePlazas = ObtienePlazas;
}
