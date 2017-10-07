'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp')
  .controller('MainCtrl', function ($localStorage, $window, $location, rolFactory, $firebaseArray, firebase,toaster) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.$onInit = function () {
     
      var config = {
        apiKey: 'AIzaSyBFtB3eFrr1Br5ohphAGtQ5c8ONQQw5C-Y',
        authDomain: 'boss-5fbab.firebaseapp.com',
        databaseURL: 'https://boss-5fbab.firebaseio.com',
        projectId: 'boss-5fbab',
        storageBucket: 'boss-5fbab.appspot.com',
        messagingSenderId: '1031430485862'
      };
      firebase.initializeApp(config);


      if ($localStorage.currentUser) {
        vm.menus = $localStorage.currentUser.menu;
        vm.usuario = $localStorage.currentUser.usuario;
        rolFactory.GetRoleList().then(function (data) {
          data.GetRoleListResult.forEach(function (item) {
            if (item.IdRol === $localStorage.currentUser.idRol) {
              vm.rol = item.Nombre;
            }
          });

          var ref = firebase.database().ref().child('messages');
          vm.messages = $firebaseArray(ref);
          console.log(vm.messages);




          var first = true;

          ref.limitToLast(1).on('child_added', function (snap) {
            console.log(snap);
            if (first) {
              first = false;
            } else {
              toaster.pop('info', 'se ha generado una nueva memoria', 'text');
            }
          });



          // console.log( vm.messages.getChildrenCount());
          //getChildrenCount ()
          //  vm.count= snapshot.numChildren() 

        });
      } else {
        $location.path('/auth/login');
      }

    };

    function logOut() {
      delete $localStorage.currentUser;
      $window.location.reload();
    }

    var vm = this;
    vm.logOut = logOut;
  });
