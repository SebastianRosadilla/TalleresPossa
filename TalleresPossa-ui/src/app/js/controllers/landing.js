(function (ng) {
  'use strict';

  var LandingCtrl = function ($state, $scope, $location, $rootScope, Auth, $q) {
    this._$state = $state;
    this._$scope = $scope;
    this.$q = $q;

    //FIXME trouble whit jQuery
    if ($rootScope.notHome) {
      $rootScope.Home = false;
      window.location.reload();
    }
  };

  LandingCtrl.prototype.logged = function() {
    // var $Auth = this.$Auth,
    //     deffered = this.$q.defer(),
    //     auth = false;
    //
    // $Auth.auth().then(function(data) {
    //   auth = data
    // })
    //
    // return
  }

  ng.module('talleresPossa')
    .controller('LandingCtrl', LandingCtrl);
})(angular);
