'use strict';

angular.module('softvFrostApp')
    .controller('ReporteMemoriasRechazadasCtrl', function ($http, reportesFactory, $timeout, ngNotify, $state, memoriaFactory, $uibModal, globalService, usuarioFactory) {
        var vm = this;
        GeneraReporte();
        init();
        vm.DescargarReporte = DescargarReporte;
        vm.Notas = Notas;
        vm.GeneraReporte = GeneraReporte;
        vm.CambioDistribuidor = CambioDistribuidor;
        vm.CheckFechas = false;
        vm.CheckPlaza = false;
        vm.CheckDistribuidor = false;

        function init() {
            usuarioFactory.GetDistribuidores().then(function (data) {
                vm.Distribuidores = data.GetDistribuidoresResult;
                
            });
        }

        function CambioDistribuidor(){
            usuarioFactory.GetPlazas(vm.Distribuidor.Clave).then(function (data) {
                vm.Plazas = data.GetPlazasResult;
            });
        }

        function DescargarReporte() {
            var parametros = {};
            parametros.Op = 0;
            if(vm.CheckDistribuidor){
                parametros.Clv_Plaza = vm.Distribuidor.Clave;
            }
            else{
                parametros.Clv_Plaza = -1;
            }

            if(vm.CheckPlaza){
                parametros.IdCompania = vm.Plaza.Clave;
            }
            else{
                parametros.IdCompania = -1;
            }

            if(vm.CheckFechas){
                parametros.FechaInicial = vm.FechaInicial;
                parametros.FechaFinal = vm.FechaFinal;
            }
            else{
                parametros.FechaInicial = '01/01/1900';
                parametros.FechaFinal = '01/01/1900';
            }

            memoriaFactory.GetReporteMemoriasRechazadasExcel(parametros).then(function (data) {
                console.log(data);
                var urlReporte = data.GetReporteMemoriasRechazadasExcelResult;

                vm.url = globalService.getUrlReportes() + '/Reportes/' + urlReporte;
                //$window.open(vm.url, '_self');

                var isChrome = !!window.chrome && !!window.chrome.webstore;
                var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                var isEdge = !isIE && !!window.StyleMedia;


                if (isChrome) {
                    var url = window.URL || window.webkitURL;

                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href', vm.url);
                    downloadLink.attr('target', '_self');
                    downloadLink.attr('download', 'ReporteMemoriasRechazadasServicio.xlsx');
                    downloadLink[0].click();
                } else if (isEdge || isIE) {
                    window.navigator.msSaveOrOpenBlob(vm.url, 'ReporteMemoriasRechazadasServicio.xlsx');

                } else {
                    var fileURL = vm.url;
                    window.open(fileURL);
                }
            });
        }

        function Notas(IdMemoriaTecnica) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/memorias/ModalMemoriaDetallado.html',
                controller: 'ModalMemoriaDetalladoCtrl',
                controllerAs: '$ctrl',
                backdrop: 'static',
                keyboard: false,
                size: "lg",
                resolve: {
                    IdMemoriaTecnica: function () {
                        return IdMemoriaTecnica;
                    }
                }
            });
        }

        function GeneraReporte() {
            var parametros = {};
            parametros.Op = 0;
            if(vm.CheckDistribuidor){
                parametros.Clv_Plaza = vm.Distribuidor.Clave;
            }
            else{
                parametros.Clv_Plaza = -1;
            }

            if(vm.CheckPlaza){
                parametros.IdCompania = vm.Plaza.Clave;
            }
            else{
                parametros.IdCompania = -1;
            }

            if(vm.CheckFechas){
                parametros.FechaInicial = vm.FechaInicial;
                parametros.FechaFinal = vm.FechaFinal;
            }
            else{
                parametros.FechaInicial = '01/01/1900';
                parametros.FechaFinal = '01/01/1900';
            }

            memoriaFactory.GetReporteMemoriasRechazadas(parametros).then(function (data) {
                vm.rowCollection4 = data.GetReporteMemoriasRechazadasResult;
            });
        }

    });
