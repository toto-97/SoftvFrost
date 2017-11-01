'use strict';
angular.module('softvFrostApp').controller('catalogoPoolsCtrl', catalogoPoolsCtrl);

	function catalogoPoolsCtrl($state, ngNotify, $timeout, configuracionIPFactory) {
		var vm = this;
		this.$onInit = function () {
			configuracionIPFactory.getPoolsIP().then(function (data) {
				vm.rowCollection = data.GetMuestraPoolsIPListResult;
				//vm.filteredCollection = data.GetMuestraPoolsIPListResult;
			});
	}

}
