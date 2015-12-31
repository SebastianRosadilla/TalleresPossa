(function (ng) {
  'use strict';

  var ShowCtrl = function ($state, $q, Info) {
    this._$state = $state;
    this._$q = $q;
    this._$Info = Info;
    this.admin = {auth: false};
    this.allInfo = {myInfo: {}, userData: []};

    this.init();
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
