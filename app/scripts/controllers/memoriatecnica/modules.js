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
        pageTitle: 'BOSS | MEMORIA TECNICA',
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
        pageTitle: 'BOSS | NUEVA MEMORIA TÉCNICA',
      },
      url: '/memoriastecnicas/nuevamemoria',
      templateUrl: 'views/memorias/nuevamemoriatecnica.html',
      controller: 'nuevamemoriatecnicaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.detallememoria',
      data: {
        pageTitle: 'BOSS | DETALLE MEMORIA TÉCNICA',
      },
      url: '/memoriastecnicas/detalle/:id',
      templateUrl: 'views/memorias/nuevamemoriatecnica.html',
      controller: 'detallememoriatecnicaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.editarmemoria',
      data: {
        pageTitle: 'BOSS | EDITAR MEMORIA TÉCNICA',
      },
      url: '/memoriastecnicas/edit/:id',
      templateUrl: 'views/memorias/nuevamemoriatecnica.html',
      controller: 'editamemoriatecnicaCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.bitacora',
      data: {
        pageTitle: 'BOSS | BITÁCORA',
      },
      url: '/bitacora',
      templateUrl: 'views/memorias/bitacora.html',
      controller: 'bitacoraCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.manuales',
      data: {
        pageTitle: 'BOSS | MANUALES',
      },
      url: '/manuales',
      templateUrl: 'views/memorias/manuales.html',
      controller: 'manualesCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.reporte',
      data: {
        pageTitle: 'BOSS | REPORTE MT',
      },
      url: '/reportememoria',
      templateUrl: 'views/memorias/reporteMemoria.html',
      controller: 'reporteMemoriaCtrl',
      controllerAs: '$ctrl'
    }
    ,
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
      templateUrl: 'views/memoriasServicios/memoriasServicio.html',
      controller: 'memoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },

    {
      name: 'home.memoria.nuevamemoriaServicio',
      data: {
        pageTitle: 'BOSS | NUEVA MEMORIA SERVICIO',
      },
      url: '/memoriastecnicasServicio/nuevamemoria',
      templateUrl: 'views/memoriasServicios/nuevamemoriatecnicaServicio.html',
      controller: 'nuevamemoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.detallememoriaServicio',
      data: {
        pageTitle: 'BOSS | DETALLE MEMORIA TECNICA SERVICIO',
      },
      url: '/memoriastecnicasServicio/detalle/:id',
      templateUrl: 'views/memoriasServicios/nuevamemoriatecnicaServicio.html',
      controller: 'detallememoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.editarmemoriaServicio',
      data: {
        pageTitle: 'BOSS | EDITAR MEMORIA TECNICA SERVICIO',
      },
      url: '/memoriastecnicasServicio/edit/:id',
      templateUrl: 'views/memoriasServicios/nuevamemoriatecnicaServicio.html',
      controller: 'editamemoriatecnicaServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.bitacoraServicio',
      data: {
        pageTitle: 'BOSS | BITACORA SERVICIO',
      },
      url: '/bitacoraServicios',
      templateUrl: 'views/memoriasServicios/bitacoraServicio.html',
      controller: 'bitacoraServicioCtrl',
      controllerAs: '$ctrl'
    },
    {
      name: 'home.memoria.reporteServicio',
      data: {
        pageTitle: 'BOSS | REPORTE',
      },
      url: '/reportememoriaServicio',
      templateUrl: 'views/memoriasServicios/reporteMemoriaServicio.html',
      controller: 'reporteMemoriaServicioCtrl',
      controllerAs: '$ctrl'
    }
    ,
    {
      name: 'home.memoria.reporterechazada',
      data: {
        pageTitle: 'BOSS | MT Servicio Rechazadas',
        permissions: {
          only: ['memoriastecnicasrechazadasserviciosSelect'],
          options: {
            reload: false
          }
        }
      },
      url: '/ReporteMemoriasRechazadas',
      templateUrl: 'views/memorias/ReporteMemoriasRechazadas.html',
      controller: 'ReporteMemoriasRechazadasCtrl',
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
