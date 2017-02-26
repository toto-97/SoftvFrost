'use strict';
angular.module('softvFrostApp').controller('RolesCtrl', RolesCtrl);

function RolesCtrl(rolFactory){

  function Init(){
    rolFactory.GetRoleList().then(function(data){
      vm.Roles=data.GetRoleListResult;
    });
  }

  var vm=this;
  Init();
}
