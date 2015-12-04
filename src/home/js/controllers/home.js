(function (ng) {
  'use strict';

  var HomeCtrl = function ($state, $scope) {
    this._$state = $state;
    this._$scope = $scope;

    this.openfooter = false;
    this.heightHome();
  };

  HomeCtrl.prototype.heightHome = function() {
    var height = window.screen.height,
        element = document.getElementsByClassName('home')[0];

        element.style.height =  height * 3 + 'px';
  }

  ng.module('talleresPossa')
    .controller('HomeCtrl', HomeCtrl);
})(angular);
