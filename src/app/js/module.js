(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource',
    'home'
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
          }
        });
    })
    .directive('srFooter', function() {
      return {
        templateUrl: 'app/templates/footer.html',
        restrict: 'E'
      }
    });
})(angular);
