'use strict';
angular.module('softvFrostApp').config(function ($stateProvider) {
  var states = [{
      name: 'home.memoria',
      abstract: true,
      template: '<div ui-view></div>'
    },
    {
      name: 'home.memoria.memoriastecnicas',
      data: {
        pageTitle: 'SOFTV | MEMORIA TECNICA',
        permissions: {
          //only: ['memoriaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/memoriastecnicas',
      templateUrl: 'views/memorias/memorias.html',
      controller: 'memoriatecnicaCtrl',
      controllerAs: '$ctrl'
    },

    {
      name: 'home.memoria.nuevamemoria',
      data: {
        pageTitle: 'SOFTV | NUEVA MEMORIA TELEFÓNICA',
      },
      url: '/memoriastecnicas/nuevamemoria',
      templateUrl: 'views/memorias/nuevamemoriatecnica.html',
      controller: 'nuevamemoriatecnicaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.detallememoria',
      data: {
        pageTitle: 'SOFTV | DETALLE MEMORIA TECNICA',
      },
      url: '/memoriastecnicas/detalle/:id',
      templateUrl: 'views/memorias/nuevamemoriatecnica.html',
      controller: 'detallememoriatecnicaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.editarmemoria',
      data: {
        pageTitle: 'SOFTV | EDITAR MEMORIA TECNICA',
      },
      url: '/memoriastecnicas/edit/:id',
      templateUrl: 'views/memorias/nuevamemoriatecnica.html',
      controller: 'editamemoriatecnicaCtrl',
      controllerAs: '$ctrl'
    }
  ];

  states.forEach(function (state) {
    $stateProvider.state(state);
  });
});
