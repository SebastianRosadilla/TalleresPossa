(function (ng) {
  'use strict';

  var FooterCtrl = function ($state, $scope) {
    this._$state = $state;
    this._$scope = $scope;
  };

  ng.module('talleresPossa')
    .controller('FooterCtrl', FooterCtrl);
})(angular);
