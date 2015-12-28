(function (ng) {
  'use strict';

  var LandingCtrl = function ($state, $location, $rootScope, Auth, $q, $http) {
    // Reference to use scope
    var $scope = this;

    this._$state = $state;
    this._$http = $http;
    this.$Auth = Auth;
    this.$q  = $q;
    this.userInfo = {};
    this.initialized = false;

    this.init().then(function(userInfo) {
      $scope.userInfo = userInfo || {};
      $scope.initialized  = true;
    })

    //FIXME trouble whit jQuery
    if ($rootScope.notHome) {
      $rootScope.Home = false;
      window.location.reload();
    }
  };

  LandingCtrl.prototype.init = function() {
    var $Auth = this.$Auth,
        info  =this._info,
        deffered = this.$q.defer();

    $Auth.allInfo()
    .then(function(data) {
      if (data != '')
        deffered.resolve(data[0])
      else
        deffered.resolve(data)
    })

    return deffered.promise;
  }

  LandingCtrl.prototype.logged = function() {
    if (localStorage.TalleresPossaAuth != '')
      return false

    return true
  }

  LandingCtrl.prototype.closeSession = function() {
    var $http = this._$http,
        $scope = this;

        console.log($scope);
    $scope.userInfo.hasOwnProperty('Usuario') ? $scope.user = userInfo.Usuario : $scope.user = '';

    $http({
      url: 'http://127.0.0.1:8000/signOut',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
       user: $scope.user
      })
    })

    localStorage.TalleresPossaAuth = '';
}

  ng.module('talleresPossa')
    .controller('LandingCtrl', LandingCtrl);
})(angular);
