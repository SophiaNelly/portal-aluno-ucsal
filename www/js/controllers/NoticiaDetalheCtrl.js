(function () {
  'use strict';

  angular.module('ucsalApp').controller('NoticiaDetalheCtrl', function ($scope, $stateParams, $state, NoticiasService) {
    $scope.noticia = NoticiasService.buscarPorId($stateParams.id);
    if (!$scope.noticia) {
      $state.go('app.noticias');
    }
  });
}());
