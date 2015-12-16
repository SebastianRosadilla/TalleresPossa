(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource',
    'home',
    'login'
  ];

  ng.module('talleresPossa', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('landing', {
          url: '/',
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
        restrict: 'AE'
      }
    })
    .directive('srFormulario', function() {
      return {
        templateUrl: 'app/templates/formulario.html',
        restric: 'AE'
      }
    })
    .directive('srGallery', function() {
      return {
        templateUrl: 'app/templates/gallery.html',
        restrict: 'AE'
      }
    });
})(angular);