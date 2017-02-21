'use strict';
angular.module('softvFrostApp').config(provisionConf);

function provisionConf($stateProvider) {
	var states = [{
			name: 'home.provision',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.provision.suscriptores',
			data: {
				pageTitle: 'SOFTV | SUSCRIPTORES',
			},
			url: '/provision/suscriptores',
			templateUrl: 'views/provision/suscriptores.html',
			controller: 'SuscriptorCtrl',
			controllerAs: '$ctrl'
		}
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
