(function (ng) {
  'use strict';

  var LandingCtrl = function ($state, $location, $rootScope, Info, $q, $http) {
    // Reference to use scope
    var $scope = this;

    this._$state = $state;
    this._$http = $http;
    this.$Info = Info;
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
      window.location = 'http://54.213.88.198:3000';

      // none display the things for 0.5s to render the page
      // This behavior allow no see the restructure then of visit home page
      document.getElementsByClassName('main')[0].style.display = 'none';
      setTimeout(function () {
        document.getElementsByClassName('main')[0].style.display = '';
      }, 500)
    }
  };

  LandingCtrl.prototype.init = function() {
    var $Info = this.$Info,
        info  = this._info,
        deffered = this.$q.defer();

    $Info.allInfo()
    .then(function(data) {
      if (data != '')
        deffered.resolve(data[0])
      else
        deffered.resolve(data)
    })

    return deffered.promise;
  }

  LandingCtrl.prototype.delete = function() {
    var $http = this._$http,
        userInfo = this.userInfo;

    // In first time we close the current session
    this.closeSession();


    if (userInfo.Usuario) {
      $http({
        url: 'http://54.213.88.198:8000/delete',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
         user: userInfo.Usuario
        })
      }).success(function(result) {
        if (result == 'success')
          alert('Operacion exitosa')
        else
          alert('Error al intentar borrar usuario')
      })
    }

  }

  LandingCtrl.prototype.logged = function() {
    return (localStorage.hasOwnProperty(TalleresPossaAuth) && localStorage.TalleresPossaAuth != '')
  }

  LandingCtrl.prototype.closeSession = function() {
    var $http = this._$http,
        $scope = this;

    $scope.userInfo.hasOwnProperty('Usuario') ? $scope.user = $scope.userInfo.Usuario : $scope.user = '';

    $http({
      url: 'http://54.213.88.198:8000/signOut',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
       user: $scope.user
      })
    })
    .success(function() {localStorage.TalleresPossaAuth = ''})
}

  ng.module('talleresPossa')
    .controller('LandingCtrl', LandingCtrl);
})(angular);
