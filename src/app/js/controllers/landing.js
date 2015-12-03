(function (ng) {
  'use strict';

  var LandingCtrl = function ($state, $scope) {
    this._$state = $state;
    this._$scope = $scope;

    this.openfooter = false;
  };

  ng.module('talleresPossa')
    .controller('LandingCtrl', LandingCtrl);
})(angular);
