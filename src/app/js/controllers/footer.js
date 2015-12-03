(function (ng) {
  'use strict';

  var FooterCtrl = function ($state, $scope) {
    this._$state = $state;
    this._$scope = $scope;

    this.public = this.public();
  };

  // Return true if state is landing page
  FooterCtrl.prototype.public = function() {
    var $state = this._$state;

    if($state.current.name == "landing") return true;

    return false;
  }

  ng.module('talleresPossa')
    .controller('FooterCtrl', FooterCtrl);
})(angular);
