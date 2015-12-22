(function (ng) {
  'use strict';

  var LandingCtrl = function ($state, $scope, $location, $rootScope) {
    this._$state = $state;
    this._$scope = $scope;

    //FIXME trouble whit jQuery
    if ($rootScope.notHome) {
      $rootScope.Home = false;
      window.location.reload();
    }
  };

  ng.module('talleresPossa')
    .controller('LandingCtrl', LandingCtrl);
})(angular);
