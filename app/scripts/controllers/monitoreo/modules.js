'use strict';
angular.module('softvFrostApp').config(function($stateProvider) {
	var states = [{
			name: 'home.monitoreo',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.monitoreo.diagnostic',
			data: {
				pageTitle: 'BOSS | DIAGNOSTIC TOOLS',
				permissions: {
					only: ['sitediagnostictoolSelect'],
					options: {
						reload: true
					}
				}
			},
			url: '/monitoreo/disgnostic',
			templateUrl: 'views/monitoreo/diagnostic.html',
			controller: 'DiagnosticCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.monitoreo.onSite',
			data: {
				pageTitle: 'BOSS | SITE VALIDATION',
				permissions: {
					only: ['onsitevalidationtool1Select'],
					options: {
						reload: true
					}
				}
			},
			url: '/monitoreo/validation',
			templateUrl: 'views/monitoreo/validation.html',
			controller: 'ValidationCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.monitoreo.onSiteTwo',
			data: {
				pageTitle: 'BIENVENIDO | MONITOREO BOSS',
			},
			url: '/monitoreo/details',
			templateUrl: 'views/monitoreo/displayForSan.html',
			controller: 'DisplayForSanCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.monitoreo.MapaTerminales',
			data: {
				pageTitle: 'BIENVENIDO | MONITOREO BOSS',
			},
			url: '/monitoreo/MapaTerminales',
			templateUrl: 'views/monitoreo/MapaTerminales.html',
			controller: 'MapaTerminalesCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.monitoreo.DetalleTerminal',
			data: {
				pageTitle: 'BIENVENIDO | MONITOREO BOSS',
			},
			url: '/monitoreo/DetalleTerminal?id',
			templateUrl: 'views/monitoreo/DetalleTerminal.html',
			controller: 'DetalleTerminalCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.monitoreo.EstadoTerminales',
			data: {
				pageTitle: 'BIENVENIDO | MONITOREO BOSS',
			},
			url: '/monitoreo/EstadoTerminales',
			templateUrl: 'views/monitoreo/EstadoTerminales.html',
			controller: 'EstadoTerminalesCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
});
