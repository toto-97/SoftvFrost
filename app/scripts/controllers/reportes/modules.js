'use strict';
angular.module('softvFrostApp').config(reportesConf);

function reportesConf($stateProvider) {
	var states = [{
			name: 'home.reportes',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.reportes.planta',
			data: {
				pageTitle: 'STAR.GO | REPORTES PLANTA'				
			},
			url: '/reportes/planta',
			templateUrl: 'views/reportes/reportesplanta.html',
			controller: 'Reportes_PlantaCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.tokens',
			data: {
				pageTitle: 'STAR.GO | REPORTES TOKENS'				
			},
			url: '/reportes/tokens',
			templateUrl: 'views/reportes/reportestokens.html',
			controller: 'Reportes_TokenCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.detalleTerminales',
			data: {
				pageTitle: 'STAR.GO | REPORTES DETALLE TERMINALES'				
			},
			url: '/reportes/terminales',
			templateUrl: 'views/reportes/reportesdetalleterm.html',
			controller: 'Reportes_DetalleCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.migraciones',
			data: {
				pageTitle: 'STAR.GO | REPORTES MIGRACIONES'				
			},
			url: '/reportes/migraciones',
			templateUrl: 'views/reportes/reportesmigraciones.html',
			controller: 'Reportes_MigracionCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.movimientos',
			data: {
				pageTitle: 'STAR.GO | REPORTES MOVIMIENTOS'				
			},
			url: '/reportes/movimientos',
			templateUrl: 'views/reportes/reportesmovimientos.html',
			controller: 'Reportes_MovimientoCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.general',
			data: {
				pageTitle: 'STAR.GO | REPORTES GENERAL'				
			},
			url: '/reportes/general',
			templateUrl: 'views/reportes/reportesgeneral.html',
			controller: 'Reportes_reporteGeneralCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.generalPlataforma',
			data: {
				pageTitle: 'STAR.GO | REPORTES GENERAL POR PLATAFORMA'				
			},
			url: '/reportes/generalPlataforma',
			templateUrl: 'views/reportes/reportesgeneralPlataforma.html',
			controller: 'Reportes_reporteGeneralPlataformaCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.datosDelSuscriptor',
			data: {
				pageTitle: 'STAR.GO | REPORTES DATOS DEL SUSCRIPTOR'				
			},
			url: '/reportes/datosDelSuscriptor',
			templateUrl: 'views/reportes/reportesdatosDelSuscriptor.html',
			controller: 'Reportes_DatosDelSuscriptorCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.reportes.contrato',
			data: {
				pageTitle: 'STAR.GO | REPORTES CONTRATO'				
			},
			url: '/reportes/contrato',
			templateUrl: 'views/reportes/reportesContrato.html',
			controller: 'Reportes_ContratoCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}