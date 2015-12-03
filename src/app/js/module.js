(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource'
  ];

  ng.module('talleresPossa', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('landing', {
          url: '',
          views: {
            main: {
              templateUrl: 'app/templates/landing.html',
              controller: 'LandingCtrl as landing'
            },
            header: {
              templateUrl: 'app/templates/header.html',
              controller: 'HeaderCtrl as header'
            },
            footer: {
              templateUrl: 'app/templates/footer.html',
              controller: 'FooterCtrl as footer'
            }
          }
        });
    });
})(angular);
