'use strict';
angular.module('softvFrostApp').config(incidendiasConf);

function incidendiasConf($stateProvider) {
	var states = [{
			name: 'home.incidencias',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.incidencias.registro',
			data: {
				pageTitle: 'SOFTV | REGISTRO',
			},
			url: '/incidencias/registro',
			templateUrl: 'views/incidencias/registro.html',
			controller: 'RegistroCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
