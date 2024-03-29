(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource',
    'home',
    'login',
    'showInfo',
    'editInfo'
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
            }
          },
          data: { requiresLogin: false }
        })
        .state('landing2', {
          url: '/',
          views: {
            main: {
              templateUrl: 'app/templates/landing.html',
              controller: 'LandingCtrl as landing'
            }
          },
          data: { requiresLogin: false }
        });
    })
    .directive('srFooter', function() {
      return {
        templateUrl: 'app/templates/footer.html',
        restrict: 'AE'
      }
    });
})(angular);
