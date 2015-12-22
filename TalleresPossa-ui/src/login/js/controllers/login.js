(function (ng) {
  'use strict';

  var LoginCtrl = function ($state, $scope, $location, $rootScope) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;
    this.user = '';
    this.password = '';
    this.err = 'Talleres Possa S.A';
  };

  LoginCtrl.prototype.validation = function(type) {
    var $scope = this;

    // long field validation
    if ($scope.user.length > 7 && $scope.password.length > 7) 
      // password validation
      if (/^[a-zA-Z0-9]+(\W|_|-)+[a-zA-Z0-9]*/.test($scope.password)) {
        $scope.err = 'Talleres Possa S.A';
        return true
      } else
          $scope.err = 'La contrseña debe contener al menos un caracter especial';

    return false;
  }

  ng.module('talleresPossa')
    .controller('LoginCtrl', LoginCtrl);
})(angular);
