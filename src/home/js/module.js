(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource'
  ];

  ng.module('home', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          views: {
            main: {
              templateUrl: 'home/templates/home.html',
              controller: 'HomeCtrl as home'
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
