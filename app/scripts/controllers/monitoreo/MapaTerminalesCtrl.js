'use strict';
angular
	.module('softvFrostApp')
	.controller('MapaTerminalesCtrl', ModalGetLatLongCtrl);

function ModalGetLatLongCtrl(SuscriptorFactory, $rootScope, ngNotify, NgMap) {
	function initialData() {
		NgMap.getMap().then(function(map) {
			//vm.latlng = [parseFloat(datosGis.lat), parseFloat(datosGis.long)];
			vm.map = map;
			google.maps.event.trigger(vm.map, 'resize');
		});
	}

	function getpos(event) {
		vm.latlng = [event.latLng.lat(), event.latLng.lng()];
	};
	var vm = this;
	vm.getpos = getpos;
	initialData();
}
