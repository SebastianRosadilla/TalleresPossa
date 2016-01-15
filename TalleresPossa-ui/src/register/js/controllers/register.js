(function (ng) {
  'use strict';

  var RegCtrl = function ($state, $scope, $location, $rootScope, $http, $q) {
    this._$state = $state;
    this._$scope = $scope;
    this._$q = $q;
    this._$http = $http;
    this._$location = $location;
    this.err = 'Para habilitar el boton enviar, se deben llenar los campos correctamente'
              +' Fax y Empresa no son obligatorios.';
    this.formElements = {
      user: '', password: '',
      name: '', company: '',
      number: '', fax: '',
      phone: '', email: '',
      description: ''
    }

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

  RegCtrl.prototype.userValidation = function() {
    var $http = this._$http,
        formElements = this.formElements,
        deffered = this._$q.defer();

    $http({
      url: 'http://127.0.0.1:8000/userExist',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
        user: formElements.user
      })
    })
    .success(function(result) {
      if (result == 'true')
        deffered.resolve(false);
      else
        deffered.resolve(true)
    })

    return deffered.promise
  }

  RegCtrl.prototype.emailValidation = function() {
    var $http = this._$http,
        formElements = this.formElements,
        deffered = this._$q.defer();

    $http({
      url: 'http://127.0.0.1:8000/emailExist',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
        email: formElements.email
      })
    })
    .success(function(result) {
      if (result == 'true')
        deffered.resolve(false);
      else
        deffered.resolve(true)
    })

    return deffered.promise
  }

  RegCtrl.prototype.validation = function() {
    var $scope = this,
        checkEmpty = false,
        formElements = this.formElements;

    // check if some field is different to empty
    for (var i in formElements) {
      checkEmpty = formElements[i] != '' | checkEmpty
    }

    // check some field is not empty
    if (checkEmpty)
      // lenght validation
      if (formElements.user.length > 7 && formElements.password.length > 7
          // abc@gmail.com has 13 letters
          && formElements.email.length > 3 && formElements.name.length > 7)
          // password validation
          if (/^[a-zA-Z0-9]+(\W|_|-)+[a-zA-Z0-9]*/.test(formElements.password))
            // email validation
            if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(formElements.email))
              // number validation
              if (/^\+?(\d{1,3})?[- .]?\d+$/.test(formElements.number))
                // phone number
                if (/^\+?(\d{1,3})?[- .]?\d+$/.test(formElements.phone)) {
                  $scope.err = 'Talleres Possa S.A';
                  return true
                } else
                    $scope.err = 'Celular invalido';
              else
                $scope.err = 'Telefono invalido';
            else
                $scope.err = 'Email invalido'
          else
            $scope.err = 'La contrseña debe tener al menos 8 digitos y un caracter especial (este no puede estar en el inicio)'
      else
        $scope.err = 'Todos los campos son obligatorios menos el de fax y el de empresa, el usuario y la contrasena no pueden tener menos de 8 digitos'
    else
      $scope.err = 'Tallere Possa S.A';
    return false;
  }

  RegCtrl.prototype.deleteAllForm = function() {
    var formElement = this.formElements;
    for (var i in formElement) {
      formElement[i] = '';
    }
  }

  RegCtrl.prototype.send = function() {
    var formElements = this.formElements,
        $http = this._$http,
        $location = this._$location,
        $scope = this;

    // check user available
    $scope.userValidation().then(function(result) {
      if (result) {
        // check email available
        $scope.emailValidation().then(function (result) {
          if (result) {
            // Send the form info
            $http({
              url: 'http://127.0.0.1:8000/register',
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: $.param({
                user: formElements.user, password: formElements.password,
                name: formElements.name, company: formElements.company,
                number: formElements.number, fax: formElements.fax,
                phone: formElements.phone, email: formElements.email,
                description: formElements.description
              })
            })
            .success(function(res) {
              if (res === 'Data Wrong')
                $window.location.href = 'http://www.cual-es-mi-ip.net/geolocalizar-ip-mapa';
              else {
                // Login user
                $http({
                  url: 'http://127.0.0.1:8000/login',
                  method: 'POST',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  data: $.param({
                   user: formElements.user,
                   password: formElements.password
                  })
                })
                .success(function(res) {
                  alert('Operacion Exitosa');
                  $location.url('/');
                  localStorage.TalleresPossaAuth = res;
                })
              }
            })
          } else
            alert('el email ingresado ya esta siendo usado por un usuario')
        })
      } else
        alert('el usuario ingresado ya existe')
    })
  }

  ng.module('talleresPossa')
    .controller('RegCtrl', RegCtrl);
})(angular);
