'use strict';
angular.module('softvFrostApp').config(function($stateProvider) {
	var states = [{
			name: 'home.configuracionip',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.configuracionip.pools',
			data: {
				pageTitle: 'BOSS | CONFIGURACIÓN DE DIRECCIONES IP',
				/*permissions: {
					only: ['poolsSelect'],
					options: {
						reload: true
					}
				}*/
			},
			url: '/configuracionip/pools',
			templateUrl: 'views/configuracionip/catalogoPools.html',
			controller: 'catalogoPoolsCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.configuracionip.nuevopools',
			data: {
				pageTitle: 'BOSS | NUEVO POOL',
			},
			url: '/configuracionip/nuevopool',
			templateUrl: 'views/configuracionip/nuevoPools.html',
			controller: 'nuevoPoolsCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.configuracionip.editapools',
			data: {
				pageTitle: 'BOSS | EDITA POOL',
			},
			url: '/configuracionip/editapool/:id',
			templateUrl: 'views/configuracionip/editaPools.html',
			controller: 'editaPoolsCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
});
