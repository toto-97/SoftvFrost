'use strict';
angular.module('softvFrostApp').controller('NuevoServicioCtrl', NuevoServicioCtrl);

function NuevoServicioCtrl(terminalFactory, rolFactory, $state, ngNotify) {
    var vm = this;
    vm.titulo = 'Nuevo Servicio';
    vm.GuardarServicio = GuardarServicio;

    /// Verifica si existe un servicio para guardarlo
    function GuardarServicio() {
        var obj = {};
        obj.Nombre = vm.Nombre;
        obj.ProgramCode = vm.ProgramCode;
        obj.Plan = vm.Plan;
        obj.PartnerId = vm.PartnerId;
        obj.Package = vm.Package;
        obj.Activo = vm.Activo;
        terminalFactory.AddServicios(obj).then(function (data) {
            vm.Error = data.GetAddServiciosResult;
            if (vm.Error == 0) {
                ngNotify.set('Servicio agregado correctamente', 'success');
                $state.go('home.provision.servicios');
            } else {
                ngNotify.set('Ya existe un servicio con el nombre registrado', 'warn');
            }
        });

    }

}
