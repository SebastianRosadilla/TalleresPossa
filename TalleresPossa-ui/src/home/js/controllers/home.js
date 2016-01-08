(function (ng) {
  'use strict';

  var HomeCtrl = function ($state, $scope, $location, $rootScope, Info, $http) {
    this._$state = $state;
    this._$scope = $scope;
    this._$http = $http;
    this.$Info = Info;
    this._$location = $location;
    this.err = 'Talleres Possa S.A';
    this.formElements = {
      name: '', company: '',
      number: '', fax: '',
      phone: '', email: '',
      subject: '', description: ''
    }

    this.stylesHome();
    this.scrollPage();
    this.initForm();

    //FIXME trouble whit jQuery
    $rootScope.notHome = true;
  };

  // Pre info on contact form
  HomeCtrl.prototype.initForm = function() {
    var formElements = this.formElements,
        $Info = this.$Info;

    $Info.nameUser().then(function(data) {
      formElements.name = data
    })

    $Info.userCompany().then(function(data) {
      formElements.company = data
    })

    $Info.userTel().then(function(data) {
      formElements.number = data
    })

    $Info.userFax().then(function(data) {
      formElements.fax = data
    })

    $Info.userPhone().then(function(data) {
      formElements.phone = data
    })

    $Info.userEmail().then(function(data) {
      formElements.email = data
    })
  }

  HomeCtrl.prototype.stylesHome = function() {
    var height = window.screen.height,
        homeMain = document.getElementsByClassName('home')[0],
        main = document.getElementsByClassName('main')[0],
        body = document.getElementsByTagName('body')[0];

        // height
        homeMain.style.height =  height * 3 + 'px';
        main.style.height = height * 3 + 'px';
        body.style.height = height * 3 + height/2 + 'px';
  }

  HomeCtrl.prototype.scrollPage = function() {
    var $scope = this._$scope,
        $state = this._$state;

    // Start the fullPage plugin
    angular.element(document).ready(function() {
      $('#fullpage-home').fullpage({
        // Navigation
    		lockAnchors: true,
    		anchors:['main', 'about', 'contact', 'footer'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 600,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: true,
        loopTop: true,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '.landing',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#ccc', '#fff'],
        paddingTop: '5%',
        paddingBottom: '10px',
        fixedElements: '#header',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){
          var header = document.getElementsByClassName('navbar-fixed-top')[0],
              parentElemetns = document.getElementsByClassName('menu')[0],
              elements = [parentElemetns.firstChild.nextSibling],
              currentIndex = (direction == 'down') ? nextIndex-- : nextIndex++,
              // Header colors
              colors = ['rgba(202, 37, 37, 0.88)',
                        'rgba(0, 131, 194, 0.88)',
                        'rgba(194, 0, 0, 0.7)'],
              // Container whit effect then scrolling
              scrolleffect = document.getElementsByClassName('section');

          // Obtain the menu elements
          var iter = 0;
          while(elements[iter].nextSibling.nextSibling != null) {
            elements.push(elements[iter].nextSibling.nextSibling);
            iter++;
          }
          if (currentIndex < 4) {
            for (var i = 0; i < elements.length; i++) {
              elements[i].classList.remove('select');
            }
            elements[currentIndex - 1].classList.add('select');
            header.style.background = colors[currentIndex - 1];
            header.classList.remove('hidden');
          } else {
            elements[2].classList.remove('select');
            header.classList.add('hidden');
          }
        },
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
      });
    });
  }

  HomeCtrl.prototype.validation = function() {
    var formElements = this.formElements,
        $scope = this,
        checkEmpty = false,
        mins = {
          name: (8 - formElements.name.length > 0) ? 8 - formElements.name.length : 0 ,
          email: (13 - formElements.email.length > 0) ? 13 - formElements.email.length : 0,
          subject: (4 - formElements.subject.length > 0) ? 4 - formElements.subject.length : 0,
          description: (50 - formElements.description.length > 0) ? 50 - formElements.description.length : 0
        };

    // check if some field is different to empty
    for (var i in formElements) {
      checkEmpty = formElements[i] != '' | checkEmpty
    }

    if (checkEmpty)
      // check the min length to required fields
      if (formElements.name.length > 8 && formElements.email.length > 13
          && formElements.subject.length > 4 && formElements.description.length > 50)
          // // email validation
         if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(formElements.email))
          //   // number validation
            if (formElements.number != '' && formElements.phone != '')
              if (/^\+?(\d{1,3})?[- .]?\d+$/.test(formElements.phone) && /^\+?(\d{1,3})?[- .]?\d+$/.test(formElements.number))
                return true
              else
                $scope.err = 'Telefono o Celular invalido'
            else
              // tel validation when phone is empty
              if (formElements.number != '')
                if (/^\+?(\d{1,3})?[- .]?\d+$/.test(formElements.number)) {
                  $scope.err = 'Talleres Possa S.A'
                  return true
                }
                else
                  $scope.err = 'Telefono invalido'
              else
                // phone validation when tel is empty
                if (formElements.phone != '')
                  if (/^\+?(\d{1,3})?[- .]?\d+$/.test(formElements.phone)) {
                    $scope.err = 'Talleres Possa S.A'
                    return true
                  }
                  else
                    $scope.err = 'Celular invalido'
                // both are empty
                else  {
                    $scope.err = 'Talleres Possa S.A'
                    return true;
                }
          else
            $scope.err = 'Email invalido';
      else
        $scope.err = 'Campos obligatorios: Nombre (min ' + mins.name +'+), Email (min ' + mins.email + '+), '
              + 'Asunto (min ' + mins.subject + '+)  y Descripcion (min ' + mins.description + '+)';
    else
      $scope.err = 'Talleres Possa S.A';

    return false;
  }

  HomeCtrl.prototype.deleteAllForm = function() {
    var formElements = this.formElements;
    for (var i in formElements) {
      formElements[i] = '';
    }
  }

  HomeCtrl.prototype.send = function() {
    var $http = this._$http,
        $scope = this,
        $location = this._$location,
        formElements = this.formElements;

    $http({
      url: 'http://54.201.114.39:8000/email',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({
        name: formElements.name, company: formElements.company,
        number: formElements.number, fax: formElements.fax,
        phone: formElements.phone, email: formElements.email,
        subject: formElements.subject, description: formElements.description
      })
    })
    .success(function(res) {
      if(res === 'ERROR AL ENVIAR LA INFORMACION')
        alert('Problema al enviar tu solcitud, Por favor intenta nuevamente')
      else
        alert('Enviado correctamente')

      $scope.deleteAllForm();
    });
  }

  ng.module('talleresPossa')
    .controller('HomeCtrl', HomeCtrl);
})(angular);
