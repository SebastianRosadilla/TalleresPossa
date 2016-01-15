(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource',
    'register'
  ];

  ng.module('login', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            main: {
              templateUrl: 'login/templates/login.html',
              controller: 'LoginCtrl as login'
            }
          },
          data: { requiresLogin: false }
        });
    });
})(angular);
