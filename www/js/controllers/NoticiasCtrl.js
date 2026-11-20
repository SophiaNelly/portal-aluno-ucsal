(function () {
  'use strict';

  angular.module('ucsalApp').controller('NoticiasCtrl', function ($scope, $state, NoticiasService) {
    $scope.noticias = NoticiasService.listar();
    $scope.filtro = {categoria: ''};

    // O filtro nativo 'filter' do AngularJS chama esta função para cada card.
    $scope.filtrarCategoria = function (noticia) {
      return !$scope.filtro.categoria || noticia.categoria === $scope.filtro.categoria;
    };

    $scope.abrirDetalhe = function (id) {
      $state.go('app.noticia', {id: id});
    };
  });
}());
