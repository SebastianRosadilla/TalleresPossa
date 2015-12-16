(function (ng) {
  'use strict';

  var RegCtrl = function ($state, $scope, $location, $rootScope) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;
  };

  ng.module('talleresPossa')
    .controller('RegCtrl', RegCtrl);
})(angular);
