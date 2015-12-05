(function (ng) {
  'use strict';

  var HomeCtrl = function ($state, $scope) {
    this._$state = $state;
    this._$scope = $scope;

    this.stylesHome();
    this.scrollPage();
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
    // Start the fullPage plugin
    angular.element(document).ready(function() {
      $('#fullpage-home').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: false,
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
        loopBottom: false,
        loopTop: false,
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
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
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
