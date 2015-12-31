(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource'
  ];

  ng.module('showInfo', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('showInfo', {
          url: '/show',
          views: {
            main: {
              templateUrl: 'showInfo/templates/show.html',
              controller: 'ShowCtrl as show'
            }
          }
        });
    });
})(angular);
