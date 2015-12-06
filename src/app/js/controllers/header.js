(function (ng) {
  'use strict';

  var HeaderCtrl = function ($state, $scope, $location) {
    this._$state = $state;
    this._$scope = $scope;
    this._$location = $location;

    this.stateSelected();
  };

  // Return true if state is landing page
  HeaderCtrl.prototype.stateSelected = function () {
    // var $scope = this._$scope,
    //     $state = this._$state,
    //     height = window.screen.height,
    //     parentElemetns = document.getElementsByClassName("menu")[0],
    //     elements = [parentElemetns.firstChild.nextSibling];
    //
    // var iter = 0;
    // while(elements[iter].nextSibling.nextSibling != null) {
    //   elements.push(elements[iter].nextSibling.nextSibling);
    //   iter++;
    // }
    //
    // document.addEventListener("scroll", function() {
    //   var j = Math.ceil(window.scrollY / height);
    //   j = (j == 0) ? 0 : j-1;
    //
    //   for (var i = 0; i < elements.length; i++) {
    //     if (i == j) {
    //       elements[i].classList.add('select');
    //     } else {
    //       elements[i].classList.remove('select');
    //     }
    //   }
    // },false);
  }

  ng.module('talleresPossa')
    .controller('HeaderCtrl', HeaderCtrl);
})(angular);
