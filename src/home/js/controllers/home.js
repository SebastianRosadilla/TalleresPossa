(function (ng) {
  'use strict';

  var HomeCtrl = function ($state, $scope, $location, $rootScope) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;

    this.stylesHome();
    this.scrollPage();

    //FIXME trouble whit jQuery
    $rootScope.notHome = true;
  };

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
        scrollingSpeed: 700,
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
              colors = ['rgba(202, 37, 37, 0.88)',
                        'rgba(0, 131, 194, 0.88)',
                        'rgba(194, 0, 0, 0.7)'];

          header.style.transition = '700';

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

  ng.module('talleresPossa')
    .controller('HomeCtrl', HomeCtrl);
})(angular);
