(function (ng) {
  'use strict';

  var LoginCtrl = function ($state, $scope, $rootScope, $http,$location) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;
    this._$http = $http;
    this.user = '';
    this.password = '';
    this.err = 'Talleres Possa S.A';

    //FIXME trouble whit jQuery
    if ($rootScope.notHome) {
      $rootScope.Home = false;
      window.location.reload();

      // none display the things for 0.5s to render the page
      // This behavior allow no see the restructure then of visit home page
      document.getElementsByClassName('main')[0].style.display = 'none';
      setTimeout(function () {
        document.getElementsByClassName('main')[0].style.display = '';
      }, 500)
    }
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

  LoginCtrl.prototype.send = function() {
    var $http = this._$http,
        $location = this._$location,
        $scope = this,
        $state = this._$state,
        // Send token for desauthenticate the last user
        tokenCod = '';

    if (localStorage.TalleresPossaAuth)
      tokenCod = localStorage.TalleresPossaAuth

    $http({
      url: 'http://54.213.88.198:80/login',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
       user: $scope.user,
       password: $scope.password,
       lastToken: tokenCod
      })
    })
    .success(function(res) {
      if (res === 'Data Wrong')
        $window.location.href = 'http://www.cual-es-mi-ip.net/geolocalizar-ip-mapa';
      else if (res === 'Data Warning') {
        alert('Usuario o Contraseña incorrectos');
        localStorage.TalleresPossaAuth = '';
        $scope.user = '';
        $scope.password = ''
      }
      else {
        alert('Operacion Exitosa');
        $state.go('landing');
        localStorage.TalleresPossaAuth = res;
      }
    })
  }

  ng.module('talleresPossa')
    .controller('LoginCtrl', LoginCtrl);
})(angular);
