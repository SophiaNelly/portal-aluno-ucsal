(function () {
  'use strict';

  angular.module('ucsalApp').controller('FinanceiroCtrl', function ($scope, $ionicPopup, FinanceiroService, $window) {
    $scope.semestres = FinanceiroService.listarSemestres();
    $scope.filtro = {semestre: $scope.semestres[0]};

    $scope.atualizar = function () {
      $scope.mensalidades = FinanceiroService.buscarPorSemestre($scope.filtro.semestre);
      $scope.quantidadePagas = $scope.mensalidades.filter(function (item) { return item.status === 'Paga'; }).length;
      $scope.quantidadeAbertas = $scope.mensalidades.filter(function (item) { return item.status === 'A Pagar'; }).length;
    };

    function mostrarConfirmacao() {
      $ionicPopup.alert({title: 'Código copiado!', template: 'A linha digitável fictícia foi copiada para a área de transferência.'});
    }

    function mostrarCodigoManual(codigo) {
      $ionicPopup.alert({
        title: 'Copie o código manualmente',
        template: '<p>O navegador bloqueou a cópia automática. Selecione o código abaixo:</p>' +
          '<p class="codigo-manual">' + codigo + '</p>'
      });
    }

    function tentarCopiaAntiga(codigo) {
      var area = $window.document.createElement('textarea');
      area.value = codigo;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      $window.document.body.appendChild(area);
      area.select();
      var funcionou = false;
      try { funcionou = $window.document.execCommand('copy'); }
      catch (_) { funcionou = false; }
      $window.document.body.removeChild(area);
      if (funcionou) { mostrarConfirmacao(); }
      else { mostrarCodigoManual(codigo); }
    }

    $scope.copiarCodigo = function (parcela) {
      if (parcela.status !== 'A Pagar' || !parcela.codigo) { return; }
      var codigo = parcela.codigo;
      if ($window.navigator.clipboard && $window.navigator.clipboard.writeText) {
        $window.navigator.clipboard.writeText(codigo).then(function () {
          $scope.$evalAsync(mostrarConfirmacao);
        }, function () {
          $scope.$evalAsync(function () { tentarCopiaAntiga(codigo); });
        });
      } else {
        tentarCopiaAntiga(codigo);
      }
    };

    $scope.atualizar();
  });
}());
