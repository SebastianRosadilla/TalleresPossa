(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource',
    'home'
  ];

  ng.module('register', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('register', {
          url: '/register',
          views: {
            main: {
              templateUrl: 'register/templates/register.html',
              controller: 'RegCtrl as register'
            }
          },
          data: { requiresLogin: false }
        });
    });
})(angular);
