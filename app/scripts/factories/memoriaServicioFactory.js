'use strict';
angular
  .module('softvFrostApp')
  .factory('memoriaServicioFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GuardaMemoriaTecnica: '/GuardaMemoriaTecnicaServicio/GetGuardaMemoriaTecnicaListServicio',
      BuscaMemoriaTecnica: '/BuscaMemoriaTecnicaServicio/GetBuscaMemoriaTecnicaListServicio',
      GetObtieneDatosPorOrden: '/BuscaMemoriaTecnicaServicio/GetObtieneDatosPorQueja',
      GuardaImagenesMemoriaTecnica: '/GuardaImagenesMemoriaTecnicaServicio/GetGuardaImagenesMemoriaTecnicaListServicio',
      GetReportepdf: '/GuardaImagenesMemoriaTecnicaServicio/GetReportepdfServicio',
      GetGuardaObservacionMemoriaTecnicaList: '/GuardaObservacionMemoriaTecnicaServicio/GetGuardaObservacionMemoriaTecnicaListServicio',
      GetObtieneObservacionesMemoriaTecnica: '/GuardaObservacionMemoriaTecnicaServicio/GetObtieneObservacionesMemoriaTecnicaServicio',
      GuardaEquiposSustituir: '/GuardaEquiposSustituirServicio/GetGuardaEquiposSustituirListServicio',
      ObtieneTiposImagenes: '/ObtieneTiposImagenes/GetObtieneTiposImagenesList',
      GetObtieneImagenesMemoriaTecnica: '/GuardaImagenesMemoriaTecnicaServicio/GetObtieneImagenesMemoriaTecnicaServicio',
      GetObtieneMemoriaTecnica: '/GuardaMemoriaTecnicaServicio/GetObtieneMemoriaTecnicaServicio',
      UpdateGuardaMemoriaTecnica: '/GuardaMemoriaTecnicaServicio/GetGuardaMemoriaTecnicaServicio',
      GetObtieneEquiposSustituir: '/GuardaEquiposSustituirServicio/GetObtieneEquiposSustituirServicio',
      GetGeneraFolioMemoriaTecnica: '/BuscaMemoriaTecnicaServicio/GetGeneraFolioMemoriaTecnicaServicio',
      GetGuardaEquiposDigital: '/GuardaEquiposSustituirServicio/GetGuardaEquiposDigitalServicio',
      GetObtieneDigitalMemoriaTecnica: '/GuardaEquiposSustituirServicio/GetObtieneDigitalMemoriaTecnicaServicio',
      GetObtieneBitacoraPorIdMemoria: '/BuscaMemoriaTecnicaServicio/GetObtieneBitacoraPorIdMemoriaServicio',
      GetReporteMemoria: '/BuscaMemoriaTecnicaServicio/GetReporteMemoriaServicio',
      GetReportexls: '/GuardaImagenesMemoriaTecnicaServicio/GetReportexlsServicio',
      GetTipoServicio: '/ObtieneTiposImagenes/GetTipoServicio',
      GetEstatusTecnico: '/ObtieneTiposImagenes/GetEstatusTecnico',
      GetTecnicosMemoriaTecnica: '/ObtieneTiposImagenes/GetTecnicosMemoriaTecnicaServicio',
      GetAparatosActuales: '/ObtieneTiposImagenes/GetAparatosActualesServicio',
      GetAparatosTecnico: '/ObtieneTiposImagenes/GetAparatosTecnicoServicio',
      GetObtieneObservacionesMemoriaTecnicaPestana:'/GuardaObservacionMemoriaTecnicaServicio/GetObtieneObservacionesMemoriaTecnicaPestanaServicio',
      GetReporteMemoriaDetallado: '/BuscaMemoriaTecnicaServicio/GetReporteMemoriaDetalladoServicio',
      GetObtieneDatosHughes: '/BuscaMemoriaTecnicaServicio/GetObtieneDatosHughesServicio',
      GetEliminaMemoriaTecnica: '/GuardaMemoriaTecnicaServicio/GetEliminaMemoriaTecnicaServicio',
      GetGeneraFolioMemoriaTecnicaVS: '/BuscaMemoriaTecnicaServicio/GetGeneraFolioMemoriaTecnicaVSServicio',
      GetActualizaEstatusMemoriaTecnica: '/GuardaMemoriaTecnicaServicio/GetActualizaEstatusMemoriaTecnicaServicio',
      GetGuardaObservacionMemoriaTecnicaListPestana: '/GuardaObservacionMemoriaTecnicaServicio/GetGuardaObservacionMemoriaTecnicaListPestanaServicio',
      GetReporteMemoriasRechazadas: '/BuscaMemoriaTecnicaServicio/GetReporteMemoriasRechazadasServicio',
      GetReporteMemoriasRechazadasExcel: '/BuscaMemoriaTecnicaServicio/GetReporteMemoriasRechazadasExcelServicio'
    };

    factory.GetReporteMemoriasRechazadasExcel = function (Parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetReporteMemoriasRechazadasExcel, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetReporteMemoriasRechazadas = function (Parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetReporteMemoriasRechazadas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetGuardaObservacionMemoriaTecnicaListPestana = function (notas) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'notas':notas       
      };
      $http.post(globalService.getUrl() + paths.GetGuardaObservacionMemoriaTecnicaListPestana, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetActualizaEstatusMemoriaTecnica = function (Parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      
      $http.post(globalService.getUrl() + paths.GetActualizaEstatusMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetGeneraFolioMemoriaTecnicaVS = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica,
        'IdUsuario': $localStorage.currentUser.idUsuario

      };
      $http.post(globalService.getUrl() + paths.GetGeneraFolioMemoriaTecnicaVS, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetEliminaMemoriaTecnica = function (Parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetEliminaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetObtieneDatosHughes = function (Parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetObtieneDatosHughes, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetReporteMemoriaDetallado = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.GetReporteMemoriaDetallado, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetObtieneObservacionesMemoriaTecnicaPestana = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneObservacionesMemoriaTecnicaPestana, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetAparatosActuales = function (Tipo, ClvQueja, IdTecnico, IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var Parametros = {
        'Tipo': Tipo,
        'IdTecnico': IdTecnico,
        'Clv_Queja': ClvQueja,
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetAparatosActuales, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetAparatosTecnico = function (Tipo, ClvQueja, IdTecnico, IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var Parametros = {
        'Tipo': Tipo,
        'IdTecnico': IdTecnico,
        'Clv_Queja': ClvQueja,
        'IdMemoriaTecnica': IdMemoriaTecnica
      };

      $http.post(globalService.getUrl() + paths.GetAparatosTecnico, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetTecnicosMemoriaTecnica = function (id, Opcion, IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      console.log(id);
      console.log($localStorage.currentUser.idUsuario);
      var Parametros = {
        'IdCompania': id,
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'Opcion': Opcion,
        'IdMemoriaTecnica': IdMemoriaTecnica
      };

      console.log(Parametros);

      $http.post(globalService.getUrl() + paths.GetTecnicosMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetEstatusTecnico = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.GetEstatusTecnico, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetTipoServicio = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.GetTipoServicio, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetGuardaObservacionMemoriaTecnicaList = function (notas) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'notas': notas
      };
      $http.post(globalService.getUrl() + paths.GetGuardaObservacionMemoriaTecnicaList, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetObtieneObservacionesMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneObservacionesMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetReporteMemoria = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.GetReporteMemoria, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetObtieneBitacoraPorIdMemoria = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Idmemoria': obj.Idmemoria,
        'Folio': obj.Folio,
        'SAN': obj.SAN,
        'Contrato': obj.Contrato,
        'Op': obj.Op,
        'IdUsuario': obj.IdUsuario
      };
      $http.post(globalService.getUrl() + paths.GetObtieneBitacoraPorIdMemoria, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };





    factory.GetObtieneDigitalMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneDigitalMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetGuardaEquiposDigital = function (equipos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'equipos': equipos
      };
      $http.post(globalService.getUrl() + paths.GetGuardaEquiposDigital, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };




    factory.GetGeneraFolioMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica,
        'IdUsuario': $localStorage.currentUser.idUsuario

      };
      $http.post(globalService.getUrl() + paths.GetGeneraFolioMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetObtieneDatosPorOrden = function (queja) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Clv_Queja': queja
      };
      $http.post(globalService.getUrl() + paths.GetObtieneDatosPorOrden, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.GetReportepdf = function (idmemoria) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'idmemoria': idmemoria
      };
      $http.post(globalService.getUrlmemoriatecnica() + paths.GetReportepdf, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };


    factory.GetReportexls = function (idmemoria) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'idmemoria': idmemoria
      };
      $http.post(globalService.getUrlmemoriatecnica() + paths.GetReportexls, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };







    factory.GuardaImagenesMemoriaTecnica = function (file, orden, options, eliminadas) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('orden', orden);
      data.append('options', JSON.stringify(options));
      data.append('eliminadas', JSON.stringify(eliminadas));

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      console.log(data);
      console.log(config);
      $http.post(globalService.getUrlmemoriatecnica() + paths.GuardaImagenesMemoriaTecnica, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };


    factory.GetObtieneEquiposSustituir = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneEquiposSustituir, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetObtieneMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GetObtieneImagenesMemoriaTecnica = function (IdMemoriaTecnica) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'IdMemoriaTecnica': IdMemoriaTecnica
      };
      $http.post(globalService.getUrl() + paths.GetObtieneImagenesMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.GuardaEquiposSustituir = function (equipos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'equipos': equipos
      };
      $http.post(globalService.getUrl() + paths.GuardaEquiposSustituir, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };



    factory.ObtieneTiposImagenes = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.ObtieneTiposImagenes, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };





    factory.UpdateGuardaMemoriaTecnica = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      console.log('config',config);
      var Parametros = {
        'objGuardaMemoriaTecnica': obj
      };
      $http.post(globalService.getUrl() + paths.UpdateGuardaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };




    factory.GuardaMemoriaTecnica = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = obj;
      $http.post(globalService.getUrl() + paths.GuardaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    factory.BuscaMemoriaTecnica = function (object) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var Parametros = {
        'Folio': object.Folio,
        'Fecha': object.Fecha,
        'IdUsuario': $localStorage.currentUser.idUsuario,
        'Clv_Queja': object.ClvQueja,
        'Op': object.op,
        'SAN': object.SAN,
        'Cliente': object.Cliente,
        'Contrato': object.Contrato,
        'Tecnico': object.Tecnico,
        'IdTecnico':object.IdTecnico,
        'Estatus':object.Estatus
      };
      $http.post(globalService.getUrl() + paths.BuscaMemoriaTecnica, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    return factory;
  });
