(function () {
  'use strict';

  angular.module('ucsalApp').controller('MenuCtrl', function ($scope, $state, AuthService) {
    $scope.usuario = AuthService.obterUsuarioAtual();
    $scope.sair = function () {
      AuthService.sair();
      $state.go('login');
    };
  });
}());
