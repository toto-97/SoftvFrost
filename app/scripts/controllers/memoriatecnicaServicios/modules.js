'use strict';
angular.module('softvFrostApp').config(function ($stateProvider) {
  var states = [{
      name: 'home.memoria',
      abstract: true,
      template: '<div ui-view></div>'
    },
    {
      name: 'home.memoria.memoriastecnicasServicio',
      data: {
        pageTitle: 'BOSS | MEMORIA TECNICA SERVICIO',
        permissions: {
          //only: ['memoriaSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/memoriastecnicasServicio',
      templateUrl: 'views/memorias/memoriasServicio.html',
      controller: 'memoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },

    {
      name: 'home.memoria.nuevamemoriaServicio',
      data: {
        pageTitle: 'BOSS | NUEVA MEMORIA SERVICIO',
      },
      url: '/memoriastecnicasServicio/nuevamemoria',
      templateUrl: 'views/memorias/nuevamemoriatecnicaServicio.html',
      controller: 'nuevamemoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.detallememoriaServicio',
      data: {
        pageTitle: 'BOSS | DETALLE MEMORIA TECNICA SERVICIO',
      },
      url: '/memoriastecnicasServicio/detalle/:id',
      templateUrl: 'views/memorias/nuevamemoriatecnicaServicio.html',
      controller: 'detallememoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.editarmemoriaServicio',
      data: {
        pageTitle: 'BOSS | EDITAR MEMORIA TECNICA SERVICIO',
      },
      url: '/memoriastecnicasServicio/edit/:id',
      templateUrl: 'views/memorias/nuevamemoriatecnicaServicio.html',
      controller: 'editamemoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.bitacoraServicio',
      data: {
        pageTitle: 'BOSS | BITACORA SERVICIO',
      },
      url: '/bitacora',
      templateUrl: 'views/memorias/bitacoraServicio.html',
      controller: 'bitacoraServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.reporteServicio',
      data: {
        pageTitle: 'BOSS | REPORTE',
      },
      url: '/reportememoriaServicio',
      templateUrl: 'views/memorias/reporteMemoriaServicio.html',
      controller: 'reporteMemoriaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.reporterechazadaservicio',
      data: {
        pageTitle: 'BOSS | MT Reporte Rechazadas',
        permissions: {
          only: ['memoriastecnicasrechazadasreportesSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/ReporteMemoriasRechazadasReportes',
      templateUrl: 'views/memoriasServicios/ReporteMemoriasRechazadasServicio.html',
      controller: 'ReporteMemoriasRechazadasServicioCtrl',
      controllerAs: '$ctrl'
    }


    
  ];

  states.forEach(function (state) {
    $stateProvider.state(state);
  });
});
