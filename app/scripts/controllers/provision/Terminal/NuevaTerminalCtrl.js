'use strict';
angular.module('softvFrostApp').controller('NuevaTerminalCtrl', TerminalCtrl);

function TerminalCtrl(terminalFactory) {
	this.$onInit = function() {

	}
	var vm = this;
	vm.titulo = "Nueva Terminal";
}
