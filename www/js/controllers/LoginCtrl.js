(function () {
  'use strict';

  angular.module('ucsalApp').controller('LoginCtrl', function ($scope, $state, AuthService) {
    $scope.credenciais = {matricula: '', senha: ''};
    $scope.erro = '';

    if (AuthService.estaAutenticado()) {
      $state.go('app.noticias');
    }

    $scope.entrar = function () {
      $scope.erro = '';
      if (!$scope.credenciais.matricula || !$scope.credenciais.senha) {
        $scope.erro = 'Preencha a matrícula e a senha.';
        return;
      }
      var aluno = AuthService.entrar($scope.credenciais.matricula, $scope.credenciais.senha);
      if (!aluno) {
        $scope.erro = 'Matrícula ou senha inválida. Tente novamente.';
        return;
      }
      $scope.credenciais.senha = '';
      $state.go('app.noticias');
    };
  });
}());
