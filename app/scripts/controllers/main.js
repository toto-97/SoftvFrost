'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp').controller('MainCtrl', function (
  $localStorage,
  $window,
  $location,
  rolFactory,
  $firebaseArray,
  firebase,
  //toaster,
  ngNotify,
  usuarioFactory,
  globalService
) {
  this.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  /* var config = {
       apiKey: 'AIzaSyBFtB3eFrr1Br5ohphAGtQ5c8ONQQw5C-Y',
       authDomain: 'boss-5fbab.firebaseapp.com',
       databaseURL: 'https://boss-5fbab.firebaseio.com',
       projectId: 'boss-5fbab',
       storageBucket: 'boss-5fbab.appspot.com',
       messagingSenderId: '1031430485862'
     };
     firebase.initializeApp(config);*/
  this.$onInit = function () {
    vm.IdRol = $localStorage.currentUser.idRol;
    vm.IdUsuario = $localStorage.currentUser.idUsuario;
    vm.IdRolSuperInstalador = globalService.IdSupervisorInstalador();

    if ($localStorage.currentUser) {
      vm.menus = $localStorage.currentUser.menu;
      vm.usuario = $localStorage.currentUser.usuario;
      rolFactory.GetRoleList().then(function (data) {
        data.GetRoleListResult.forEach(function (item) {
          if (item.IdRol === $localStorage.currentUser.idRol) {
            vm.rol = item.Nombre;
          }
        });
        var parametros = {};
        parametros.IdUsuario = $localStorage.currentUser.idUsuario;
        usuarioFactory.GetObtieneInstaladoresSupervisor(parametros).then(function (data) {
          vm.RelacionInstaladoresSupervisor = data.GetObtieneInstaladoresSupervisorResult;
          if ($localStorage.currentUser.Recibemensaje === true || $localStorage.currentUser.idRol == 4 || $localStorage.currentUser.idRol == vm.IdRolSuperInstalador) {
            var ref = firebase
              .database()
              .ref()
              .child('messages');
            vm.messages = $firebaseArray(ref);
            vm.messages.$loaded().then(function (notes) {
              //Vamos a quitar los repetidos
              vm.notesAux = [];
              notes.forEach(function (item) {
                if (!ExisteElemento(item)) {
                  vm.notesAux.push(item);
                }
              });
              vm.messages = vm.notesAux;
              notes = vm.notesAux;
              //vm.count = notes.length;
              if (vm.IdRol == vm.IdRolSuperInstalador) {//Supervisor instalador
                vm.count = 0;
                var messagesAux = [];
                notes.forEach(function (item) {
                  if ((item.Tipo == 12 || item.Tipo == 11) && ExisteInstalador(item.SAN)) {
                    vm.count = vm.count + 1;
                    messagesAux.push(item);
                  }
                });
                vm.messages = messagesAux;
              }
              else if (vm.IdRol == 4) {//Instalador
                vm.count = 0;
                notes.forEach(function (item) {
                  if ((item.Tipo == 12 || item.Tipo == 11) && item.SAN == vm.IdUsuario) {
                    vm.count = vm.count + 1;
                  }
                });
              }
              else {
                vm.count = 0;
                notes.forEach(function (item) {
                  if (item.Tipo == 1 || item.Tipo == 2 || item.Tipo == 3) {
                    vm.count = vm.count + 1;
                  }
                });
              }
            });
            var first = true;
            ref.on('child_removed', function (snapshot) {
              vm.messages.$loaded().then(function (notes) {
                //Vamos a quitar los repetidos
                vm.notesAux = [];
                notes.forEach(function (item) {
                  if (!ExisteElemento(item)) {
                    vm.notesAux.push(item);
                  }
                });
                vm.messages = vm.notesAux;
                notes = vm.notesAux;
                //vm.count = notes.length;
                if (vm.IdRol == vm.IdRolSuperInstalador) {//Supervisor instalador
                  vm.count = 0;
                  var messagesAux = [];
                  notes.forEach(function (item) {
                    if ((item.Tipo == 12 || item.Tipo == 11) && ExisteInstalador(item.SAN)) {
                      vm.count = vm.count + 1;
                      messagesAux.push(item);
                    }
                  });
                  vm.messages = messagesAux;
                }
                else if (vm.IdRol == 4) {//Instalador
                  vm.count = 0;
                  notes.forEach(function (item) {
                    if ((item.Tipo == 12 || item.Tipo == 11) && item.SAN == vm.IdUsuario) {
                      vm.count = vm.count + 1;
                    }
                  });
                }
                else {
                  vm.count = 0;
                  notes.forEach(function (item) {
                    if (item.Tipo == 1 || item.Tipo == 2 || item.Tipo == 3) {
                      vm.count = vm.count + 1;
                    }
                  });
                }
              });
            });
            ref.once('value', function (snap) {

              //TODO: display initial state...
              // Object.keys not supported in IE 8, but has a polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
              var keys = Object.keys(snap.val() || {});
              var lastIdInSnapshot = keys[keys.length - 1];

              ref.orderByKey().startAt(lastIdInSnapshot).on('child_added', function (newMessSnapshot) {
                if (snap.key === lastIdInSnapshot) {
                  return;
                }
                if (first) {
                  first = false;
                } else {
                  vm.messages.$loaded().then(function (notes) {
                    //Vamos a quitar los repetidos
                    vm.notesAux = [];
                    notes.forEach(function (item) {
                      if (!ExisteElemento(item)) {
                        vm.notesAux.push(item);
                      }
                    });
                    vm.messages = vm.notesAux;
                    notes = vm.notesAux;
                    if (vm.IdRol == vm.IdRolSuperInstalador) {//Supervisor instalador
                      vm.count = 0;
                      var messagesAux = [];
                      notes.forEach(function (item) {
                        if ((item.Tipo == 12 || item.Tipo == 11) && ExisteInstalador(item.SAN)) {
                          vm.count = vm.count + 1;
                          messagesAux.push(item);
                        }
                      });
                      vm.messages = messagesAux;
                    }
                    else if (vm.IdRol == 4) {//Instalador
                      vm.count = 0;
                      notes.forEach(function (item) {
                        if ((item.Tipo == 12 || item.Tipo == 11) && item.SAN == vm.IdUsuario) {
                          vm.count = vm.count + 1;
                        }
                      });
                    }
                    else {
                      vm.count = 0;
                      notes.forEach(function (item) {
                        if (item.Tipo == 1 || item.Tipo == 2 || item.Tipo == 3) {
                          vm.count = vm.count + 1;
                        }
                      });
                    }
                    //vm.count = notes.length;
                    ngNotify.set('<i class="fa fa-bell"></i> tienes una nueva notificación', {
                      theme: 'pitchy',
                      html: true,
                      type: 'success'
                    });
                  });
                }
              });
            });
          }
        });
      });
    } else {
      $location.path('/auth/login');
    }
  };

  function ExisteInstalador(IdUsuario) {
    var existe = false;
    vm.RelacionInstaladoresSupervisor.forEach(function (item) {
      if (item.IdUsuario == IdUsuario) {
        existe = true;
      }
    });
    if (vm.IdUsuario == IdUsuario) {
      existe = true;
    }
    return existe;
  }

  function ExisteElemento(itemBuscar) {
    var existe = false;
    vm.notesAux.forEach(function (item) {
      if (itemBuscar.Id == item.Id && itemBuscar.Tipo == item.Tipo) {
        existe = true;
        return;
      }
    });
    return existe;
  }

  function logOut() {
    delete $localStorage.currentUser;
    $window.location.reload();
  }
  var vm = this;
  vm.logOut = logOut;
  vm.ExisteInstalador = ExisteInstalador;
});
