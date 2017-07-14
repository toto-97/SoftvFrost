'use strict';
angular.module('softvFrostApp').config(function ($stateProvider) {
	var states = [{
		name: 'home.provision',
		abstract: true,
		template: '<div ui-view></div>'
	},
	{
		name: 'home.provision.suscriptores',
		data: {
			pageTitle: 'BOSS | SUSCRIPTORES',
			permissions: {
				only: ['suscriptoresSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/suscriptores',
		templateUrl: 'views/provision/suscriptores.html',
		controller: 'SuscriptorCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.terminales',
		data: {
			pageTitle: 'BOSS | Terminales',
			permissions: {
				only: ['terminalesSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/terminales?idSuscriptor',
		templateUrl: 'views/provision/Terminales.html',
		controller: 'TerminalCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.terminalesNueva',
		data: {
			pageTitle: 'BOSS | Terminales',
			permissions: {
				only: ['terminalesAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/terminales/nueva?idSuscriptor',
		templateUrl: 'views/provision/NuevaTerminal.html',
		controller: 'NuevaTerminalCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.suscriptoresNuevo',
		data: {
			pageTitle: 'BOSS | NUEVO SUSCRIPTOR',
			permissions: {
				only: ['suscriptoresAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/nuevo/suscriptor',
		templateUrl: 'views/provision/nuevoSuscriptor.html',
		controller: 'NuevoSuscriptorCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.suscriptoresEditar',
		data: {
			pageTitle: 'BOSS | EDITAR SUSCRIPTOR',
			permissions: {
				only: ['suscriptoresUpdate'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/editar/suscriptor/:id',
		templateUrl: 'views/provision/editarSuscriptor.html',
		controller: 'EditarSuscriptorCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.usuarios',
		data: {
			pageTitle: 'BOSS | USUARIOS',
			permissions: {
				only: ['usuariosSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/usuarios',
		templateUrl: 'views/configuracion/usuarios.html',
		controller: 'UsuariosCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.roles',
		data: {
			pageTitle: 'BOSS | ROLES',
			permissions: {
				only: ['rolesSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/roles',
		templateUrl: 'views/configuracion/roles.html',
		controller: 'RolesCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.permisos',
		data: {
			pageTitle: 'BOSS | PERMISOS',
			permissions: {
				only: ['permisosSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/permisos',
		templateUrl: 'views/configuracion/permisos.html',
		controller: 'PermisosCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.nuevousuario',
		data: {
			pageTitle: 'BOSS | NUEVO USUARIO',
			permissions: {
				only: ['usuariosAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/usuario/nuevo/',
		templateUrl: 'views/configuracion/NuevoUsuario.html',
		controller: 'NuevoUsuarioCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.editausuario',
		data: {
			pageTitle: 'BOSS | NUEVO USUARIO',
			permissions: {
				only: ['usuariosUpdate'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/usuario/edita/:id',
		templateUrl: 'views/configuracion/NuevoUsuario.html',
		controller: 'EditaUsuarioCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.nuevorol',
		data: {
			pageTitle: 'BOSS | NUEVO ROL',
			permissions: {
				only: ['rolesAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/rol/nuevo/',
		templateUrl: 'views/configuracion/NuevoRol.html',
		controller: 'NuevoRolCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.editarol',
		data: {
			pageTitle: 'BOSS | EDITA ROL',
			permissions: {
				only: ['rolesUpdate'],
				options: {
					reload: true
				}
			}
		},
		params: {
			obj: null
		},
		url: '/provision/rol/Edita/:id',
		templateUrl: 'views/configuracion/NuevoRol.html',
		controller: 'EditaRolCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.activacion',
		data: {
			pageTitle: 'BOSS | ACTIVACIÓN TERMINAL',
			permissions: {
				only: ['activacionAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/activacion?esn',
		templateUrl: 'views/provision/activacion.html',
		controller: 'activacionCtrl',
		controllerAs: '$ctrl'
	}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);
	});
});
