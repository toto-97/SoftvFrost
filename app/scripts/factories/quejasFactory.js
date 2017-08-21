'use strict';
angular
  .module('softvFrostApp')
  .factory('quejasFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      MuestraPlazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
      ObtenServicios: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
      ObtenColonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
      ObtenLista: '/BuscaQuejasSeparado2/GetBuscaQuejasSeparado2List',
      ValidaQueja: '/ValidaQuejaCompaniaAdic/GetDeepValidaQuejaCompaniaAdic',
      BuscaBloqueado: '/BuscaBloqueado/GetDeepBuscaBloqueado',
      ConsultaQueja: '/Quejas/GetQuejasList',
      ObtenTecnicos: '/Muestra_Tecnicos_Almacen/GetMuestra_Tecnicos_AlmacenList',
      ObtenPrioridad: '/Softv_GetPrioridadQueja/GetSoftv_GetPrioridadQuejaList',
      UpdateQuejas: '/Quejas/UpdateQuejas',
      DameBonificacion: '/DameBonificacion/GetDameBonificacionList',
      EliminaQueja: '/uspBorraQuejasOrdenes/GetDeepuspBorraQuejasOrdenes',
      GetuspInseraTblRelQuejaProblema: '/Quejas/GetuspInseraTblRelQuejaProblema',
      UploadFile: '/Quejas/GetUploadFile',
      ObtieneAvancesQueja: '/ObtieneAvancesQueja/GetDeepObtieneAvancesQueja',
      GetFileAvanceQueja: '/Quejas/GetFileAvanceQueja'
    };


    factory.GetFileAvanceQueja = function (avance,tipo) {
      var deferred = $q.defer();
      var Parametros = {
        'avance': avance,
        'tipo':tipo
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.GetFileAvanceQueja, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.ObtieneAvancesQueja = function (clave) {
      var deferred = $q.defer();
      var Parametros = {
        'clave': clave
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      console.log(Parametros);
      $http.post(globalService.getUrl() + paths.ObtieneAvancesQueja, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.UploadFile = function (file, description, orden) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('description', description);
      data.append('orden', orden);
      data.append('usuario', $localStorage.currentUser.usuariosac);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      console.log(data);
      $http.post(globalService.getUrl() + paths.UploadFile, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };


    factory.ObtenPrioridad = function () {
      var deferred = $q.defer();

      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.ObtenPrioridad, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.GetuspInseraTblRelQuejaProblema = function (obj) {
      var deferred = $q.defer();
      var Parametros = {
        'TblRelQuejaProblemaEntity': {
          'clvLlamada': obj.clvLlamada,
          'clvQueja': obj.clvQueja,
          'clvProblema': obj.clvProblema,
          'opAccion': obj.opAccion
        }


      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetuspInseraTblRelQuejaProblema, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };





    factory.ObtenTecnicos = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ObtenTecnicos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.ConsultaQueja = function (queja) {
      var deferred = $q.defer();
      var Parametros = {
        'Clv_Queja': queja

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ConsultaQueja, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.BuscaBloqueado = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.BuscaBloqueado, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.ValidaQueja = function (idqueja) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvQueja': idqueja,
        'IdUsuario': $localStorage.currentUser.usuariosac
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ValidaQueja, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };



    factory.ObtenLista = function (object) {
      var deferred = $q.defer();
      var Parametros = {
        'Clv_TipSer': object.Clv_TipSer,
        'Clv_Queja': object.Clv_Queja,
        'Contrato': object.Contrato,
        'NOMBRE': object.NOMBRE,
        'AP': object.AP,
        'AM': object.AM,
        'CALLE': object.CALLE,
        'NUMERO': object.NUMERO,
        'SetupBox': object.SetupBox,
        'Status': object.Status,
        'Op': object.Op,
        'ClvColonia': object.ClvColonia,
        'IdCompania': object.IdCompania,
        'ClvUsuario': $localStorage.currentUser.usuariosac,
        'SoloNivel2': object.SoloNivel2,
        'NoTicket': object.NoTicket
      };
      console.log(JSON.stringify(Parametros));
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ObtenLista, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.ObtenColonias = function (compania) {
      var deferred = $q.defer();
      var Parametros = {
        'idcompania': compania
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.ObtenColonias, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.ObtenServicios = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.ObtenServicios, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.MuestraPlazas = function () {
      var deferred = $q.defer();
      var Parametros = {
        'ClvUsuario': $localStorage.currentUser.usuariosac
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.MuestraPlazas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.BuscaBloqueado = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.BuscaBloqueado, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.UpdateQuejas = function (data) {
      var deferred = $q.defer();
      var Parametros = {
        'objQuejas': {
          'Clv_Queja': data.Clv_Queja,
          'Status': data.Status,
          'Fecha_Ejecucion': data.Fecha_Ejecucion,
          'Visita1': data.Visita1,
          'Visita2': data.Visita2,
          'Visita3': data.Visita3,
          'HV1': data.HV1,
          'HV2': data.HV2,
          'HV3': data.HV3,
          'FechaProceso': data.FechaProceso,
          'HP': data.HP,
          'Visita': data.Visita,
          'Clv_Tecnico': data.Clv_Tecnico,
          'clvProblema': data.Clv_Trabajo,
          'clvPrioridadQueja': data.clvPrioridadQueja,
          'Solucion': data.Solucion,
          'IdUsuario': $localStorage.currentUser.usuariosac
        }

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.UpdateQuejas, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.DameBonificacion = function (queja) {
      var deferred = $q.defer();
      var Parametros = {
        'Clv_queja': queja
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.DameBonificacion, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };


    factory.EliminaQueja = function (queja) {
      var deferred = $q.defer();
      var Parametros = {
        'ClvQueja': queja,
        'ClvUsuario': $localStorage.currentUser.usuariosac
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.EliminaQueja, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };








    return factory;
  });
