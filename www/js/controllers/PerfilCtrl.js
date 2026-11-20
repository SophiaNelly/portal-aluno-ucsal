(function () {
  'use strict';

  angular.module('ucsalApp').controller('PerfilCtrl', function ($scope, AuthService, AlunoService, $ionicPopup) {
    var usuario = AuthService.obterUsuarioAtual();
    $scope.aluno = usuario ? AlunoService.obter(usuario.matricula) : null;
    $scope.salvo = false;

    $scope.salvar = function (formulario) {
      $scope.salvo = false;
      if (!$scope.aluno || !formulario || formulario.$invalid) {
        $ionicPopup.alert({title: 'Confira os dados', template: 'Preencha os campos obrigatórios com valores válidos.'});
        return;
      }
      var atualizado = AlunoService.salvar(usuario.matricula, $scope.aluno);
      if (!atualizado) {
        $ionicPopup.alert({title: 'Não foi possível salvar', template: 'Tente acessar novamente.'});
        return;
      }
      $scope.aluno = atualizado;
      $scope.salvo = true;
      $ionicPopup.alert({title: 'Dados atualizados!', template: 'Suas informações pessoais foram salvas.'});
    };
  });
}());
