(function (ng) {
  'use strict';

  var LandingCtrl = function ($state, $scope) {
    this._$state = $state;
    this._$scope = $scope;
  };

  ng.module('talleresPossa')
    .controller('LandingCtrl', LandingCtrl);
})(angular);
