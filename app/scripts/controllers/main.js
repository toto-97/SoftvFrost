'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp').controller('MainCtrl', function(
  $localStorage,
  $window,
  $location,
  rolFactory,
  $firebaseArray,
  firebase,
  //toaster,
  ngNotify
) {
  this.awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
  var config = {
      apiKey: 'AIzaSyBFtB3eFrr1Br5ohphAGtQ5c8ONQQw5C-Y',
      authDomain: 'boss-5fbab.firebaseapp.com',
      databaseURL: 'https://boss-5fbab.firebaseio.com',
      projectId: 'boss-5fbab',
      storageBucket: 'boss-5fbab.appspot.com',
      messagingSenderId: '1031430485862'
    };
    firebase.initializeApp(config);
  this.$onInit = function() {
    

    if ($localStorage.currentUser) {
      vm.menus = $localStorage.currentUser.menu;
      vm.usuario = $localStorage.currentUser.usuario;
      rolFactory.GetRoleList().then(function(data) {
        data.GetRoleListResult.forEach(function(item) {
          if (item.IdRol === $localStorage.currentUser.idRol) {
            vm.rol = item.Nombre;
          }
        });

        if ($localStorage.currentUser.status === false) {
          $localStorage.currentUser.status = true;
          fn60sec();
          setInterval(fn60sec, 60 * 100000);
        }
        if ($localStorage.currentUser.Recibemensaje === true) {
          var ref = firebase
            .database()
            .ref()
            .child('messages');
          vm.messages = $firebaseArray(ref);
          var first = true;

          ref.on('child_removed', function(snapshot) {
            console.log(snapshot);
            vm.messages.$loaded().then(function(notes) {
              vm.count = notes.length;
            });
          });

          ref.limitToLast(1).on('child_added', function(snap) {
            vm.messages.$loaded().then(function(notes) {
              vm.count = notes.length;
            });
            console.log(snap);
            if (first) {
              first = false;
            } else {
              ngNotify.set(
                '<i class="fa fa-user"></i> Atención se ha generado una nueva memoria técnica.',
                {
                  theme: 'pitchy',
                  html: true
                }
              );
            }
          });
        }
      });
    } else {
      $location.path('/auth/login');
    }
  };

  function logOut() {
    delete $localStorage.currentUser;
    $window.location.reload();
  }

  function fn60sec() {
    ngNotify.set(
      '<i class="fa fa-exclamation-triangle"></i> ¡Atención! tienes  Memorias Tecnicas pendientes,consultalas aqui <a  href="#!/home/memoriastecnicas"><i>ir a menu</i></a>',
      {
        theme: 'pitchy',
        html: true,
        sticky: true
      }
    );
    // ngNotify.set('se ha generado una nueva memoria tècnica','grimace');
    // toaster.pop("info", "se ha generado una nueva memoria", "text");
  }

  var vm = this;
  vm.logOut = logOut;
});
