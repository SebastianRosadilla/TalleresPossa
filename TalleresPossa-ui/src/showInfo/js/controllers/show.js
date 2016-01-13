(function (ng) {
  'use strict';

  var ShowCtrl = function ($state, $q, Info, $rootScope) {
    this._$state = $state;
    this._$q = $q;
    this._$Info = Info;
    this.admin = {auth: false};
    this.allInfo = {myInfo: {}, userData: []};

    this.init();

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

  ShowCtrl.prototype.init = function() {
    var $Info = this._$Info,
        admin = this.admin,
        allInfo = this.allInfo;

    $Info.allInfo().then(function(datos) {
      allInfo.myInfo = datos[0];
      // Just the admin recibe more that personal data
      if (datos.length > 1) {
        admin.auth = true;
        for (var i = 1; i < datos.length; i++)
          allInfo.userData.push(datos[i])
      }
    })
  }


  ng.module('talleresPossa')
    .controller('ShowCtrl', ShowCtrl);
})(angular);
