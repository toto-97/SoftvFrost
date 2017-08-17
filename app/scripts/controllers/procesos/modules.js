'use strict';
angular.module('softvFrostApp').config(function($stateProvider) {
	var states = [{
			name: 'home.procesos',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
        name: 'home.procesos.atencion',
        data: {
          pageTitle: 'SOFTV | ATENCIÓN TELEFÓNICA',
          permissions: {
            only: ['atenciontelefonicaSelect'],
            options: {
              reload: false
            }
          }
        },
        url: '/atencion',
        templateUrl: 'views/procesos/atencion.html',
        controller: 'AtencionCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.procesos.atencionNueva',
        data: {
          pageTitle: 'SOFTV | NUEVA ATENCIÓN TELEFÓNICA',
        },
        url: '/atencion/nueva',
        templateUrl: 'views/procesos/atencionNueva.html',
        controller: 'AtencionNuevaCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.procesos.atencionEditar',
        data: {
          pageTitle: 'SOFTV | EDITAR ATENCIÓN TELEFÓNICA',
        },
        url: '/atencion/editar/:id',
        templateUrl: 'views/procesos/atencionNueva.html',
        controller: 'AtencionEditarCtrl',
        controllerAs: '$ctrl'
      },
      {
        name: 'home.procesos.atencionDetalle',
        data: {
          pageTitle: 'SOFTV | DETALLE ATENCIÓN TELEFÓNICA',
        },
        url: '/atencion/detalle/:id',
        templateUrl: 'views/procesos/atencionNueva.html',
        controller: 'AtencionDetalleCtrl',
        controllerAs: '$ctrl'
      }
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
});
