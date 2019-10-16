'use strict';
angular.module('softvFrostApp').controller('Reportes_PAJ', Reportes_PAJ);

function Reportes_PAJ($uibModal, $state, $stateParams, reportesFactory) {
  this.$onInit = function () {

  }

  function GeneraReporte() {
    var parametros = {};
    if (vm.SANActivo) {
      parametros.SAN = vm.SAN;
    }
    else {
      parametros.SAN = '';
    }
    if (vm.ESNActivo) {
      parametros.ESN = vm.ESN;
    }
    else {
      parametros.ESN = '';
    }
    if (vm.FapActivo) {
      if (vm.Fap) {
        parametros.Fap = 1;
      }
      else {
        parametros.Fap = 0;
      }
    }
    else {
      parametros.Fap = -1;
    }
    if (vm.FechasActivo) {
      parametros.FechaInicio = vm.FechaInicio;
      parametros.FechaFin = vm.FechaFin;
    }
    else {
      parametros.FechaInicio = '01/01/1900';
      parametros.FechaFin = '01/01/1900';
    }
    parametros.SinApagadas = vm.SinApagadas;
    reportesFactory.GetReportePAJ(parametros).then(function (data) {
      console.log('data',data);
      vm.resultados = data.GetReportePAJResult;
    });
  }

  var vm = this;
  vm.GeneraReporte = GeneraReporte;
  vm.SANActivo = false;
  vm.ESNActivo = false;
  vm.FapActivo = false;
  vm.FechasActivo = false;
  vm.Fap = false;
  vm.csvheader=['Contrato','Periodo','Umbral','Plaza','Compania','Estado','PAJ','SAN','esn','servicePlan','terminalStatus','gatewayID','beamID','beamLocation','fapStatus','availTokens','overallCapacity','Consumo','offPeakOverallCapacity','offPeakOverallUsage,','fapEarlyWarningTrigger','staticIpv4Subnet','staticIpv6Subnet','configuredIpv4Subnet','configuredIpv6Subnet','stateCode','stateCodeDescription','FechaActivacion','DiaRelleno','FechaPeticion','HoraPeticion'];
  vm.csvorder=['Contrato','Periodo','Umbral','Plaza','Compania','Estado','PAJ','SAN','esn','servicePlan','terminalStatus','gatewayID','beamID','beamLocation','fapStatus','availTokens','overallCapacity','overallUsage','offPeakOverallCapacity','offPeakOverallUsage,','fapEarlyWarningTrigger','staticIpv4Subnet','staticIpv6Subnet','configuredIpv4Subnet','configuredIpv6Subnet','stateCode','stateCodeDescription','FechaActivacion','DiaRelleno','FechaPeticion','HoraPeticion'];
  vm.SinApagadas = false;
}
