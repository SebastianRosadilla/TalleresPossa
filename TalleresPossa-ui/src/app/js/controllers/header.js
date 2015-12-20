(function (ng) {
  'use strict';

  var HeaderCtrl = function ($state, $scope, $location, $http) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;
  };

  // Return true if state is landing page
  HeaderCtrl.prototype.stateSelected = function (sect) {
    // Obtein a section heigh
    var section = document.getElementsByClassName('section')[0],
        height = section.style.height.split('px')[0],
        sections = ['home', 'about', 'contact', 'footer'],
        // scroll that need
        scrollY = height * sections.indexOf(sect);

        if (scrollY >= - 1) {
          // window.scrollTo(0, scrollY);
          $("body").animate({
              scrollTop: scrollY
          },700);
          return true;
        }
        return false;
  }

  ng.module('talleresPossa')
    .controller('HeaderCtrl', HeaderCtrl);
})(angular);
