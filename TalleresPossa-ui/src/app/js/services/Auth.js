(function (ng) {
  'use strict';

  var Auth = function ($http, $q) {

    this.allInfo = function (){
      var info,
          deffered = $q.defer();

      $http.get('http://127.0.0.1:8000').success(function(data) {
        deffered.resolve(data);
      });

      return deffered.promise;
    }

    // Return the real user name
    this.nameUser = function () {
      var name = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          name = data[0].Nombre
        }

        deffered.resolve(name);
      })

      return deffered.promise;
    }

    // Return the username
    this.userName = function () {
      var name = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          name = data[0].Usuario
        }

        deffered.resolve(name);
      })

      return deffered.promise;
    }

    // Return the user company
    this.userCompany = function () {
      var company = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          company = data[0].Empresa || ''
        }

        deffered.resolve(company);
      })

      return deffered.promise;
    }

    // Return user number
    this.userTel = function () {
      var tel = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          tel = data[0].Telefono || ''
        }

        deffered.resolve(tel);
      })

      return deffered.promise;
    }

    // Return user phone
    this.userPhone = function () {
      var phone = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          phone = data[0].Celular || ''
        }

        deffered.resolve(phone);
      })

      return deffered.promise;
    }

    // Return user fax
    this.userFax = function () {
      var fax = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          fax = data[0].Fax || ''
        }

        deffered.resolve(fax);
      })

      return deffered.promise;
    }

    // Return user email
    this.userEmail = function () {
      var email = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          email = data[0].Correo || ''
        }

        deffered.resolve(email);
      })

      return deffered.promise;
    }

    // Return user extra info
    this.userInfo = function () {
      var info = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          info = data[0].Info || ''
        }

        deffered.resolve(info);
      })

      return deffered.promise;
    }

    // Last update
    this.userLastUpdate = function () {
      var lastUpdate = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          lastUpdate = data[0].UltimaActualizacion || ''
        }

        deffered.resolve(lastUpdate);
      })

      return deffered.promise;
    }

    // Return date user creation
    this.userCreation = function () {
      var creation = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          creation = data[0].Creacion || ''
        }

        deffered.resolve(creation);
      })

      return deffered.promise;
    }

    // return true if the user is logged
    this.auth = function () {
      var logged = '',
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          logged = data[0].login
        }

        deffered.resolve(logged);
      })

      return deffered.promise;
    }

    // Return an object with the users logged
    this.usersLogged = function () {
      var logged = [],
          $scope = this,
          deffered = $q.defer();

      $scope.allInfo().then(function (data) {
        // IF someone is logged
        if (data != '') {
          for (var i = 0; i < data.length; i++) {
            logged.push({ name: data[i].Nombre, logged: data[i].login});
          }
        }

        deffered.resolve(logged);
      })

      return deffered.promise;
    }
  };

  ng.module('talleresPossa')
    .service('Auth', Auth);
})(angular);
