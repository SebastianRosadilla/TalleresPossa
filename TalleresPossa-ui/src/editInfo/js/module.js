(function(ng) {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngResource',
  ];

  ng.module('editInfo', dependencies)
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('editInfo', {
          url: '/edit',
          views: {
            main: {
              templateUrl: 'editInfo/templates/edit.html',
              controller: 'EditCtrl as edit'
            }
          },
          data: { requiresLogin: true }
        });
    });
})(angular);
