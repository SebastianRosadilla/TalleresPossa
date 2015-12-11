(function (ng) {
  'use strict';

  var LoginCtrl = function ($state, $scope, $location, $rootScope) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;
  };

  LoginCtrl.prototype.validation = function(type) {
    
  }

  ng.module('talleresPossa')
    .controller('LoginCtrl', LoginCtrl);
})(angular);
