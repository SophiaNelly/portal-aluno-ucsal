(function () {
  'use strict';

  angular.module('ucsalApp').factory('AlunoService', function ($window) {
    var alunos = {
      '20261001': {
        nome: 'Ana Souza', matricula: '20261001', curso: 'Engenharia de Software',
        email: 'ana.souza@email.com', telefone: '(71) 99999-0101',
        endereco: {cep: '41740-000', rua: 'Rua das Flores, 120', bairro: 'Pituaçu', cidade: 'Salvador'}
      },
      '20261002': {
        nome: 'Lucas Santos', matricula: '20261002', curso: 'Engenharia de Software',
        email: 'lucas.santos@email.com', telefone: '(71) 98888-0202',
        endereco: {cep: '40210-000', rua: 'Avenida Central, 85', bairro: 'Federação', cidade: 'Salvador'}
      }
    };

    function chave(matricula) { return 'ucsal-perfil-' + matricula; }

    function obter(matricula) {
      var aluno = alunos[matricula];
      if (!aluno) { return null; }
      var combinado = angular.copy(aluno);
      try {
        var salvo = $window.localStorage.getItem(chave(matricula));
        if (salvo) {
          var dados = JSON.parse(salvo);
          // Os campos institucionais não são sobrescritos pelo armazenamento local.
          combinado.email = dados.email || '';
          combinado.telefone = dados.telefone || '';
          combinado.endereco = angular.copy(dados.endereco || combinado.endereco);
        }
      } catch (_) {
        // A aplicação continua funcionando mesmo com localStorage indisponível.
      }
      return combinado;
    }

    function salvar(matricula, alteracoes) {
      if (!alunos[matricula]) { return null; }
      var camposEditaveis = {
        email: String(alteracoes.email || '').trim(),
        telefone: String(alteracoes.telefone || '').trim(),
        endereco: {
          cep: String(alteracoes.endereco.cep || '').trim(),
          rua: String(alteracoes.endereco.rua || '').trim(),
          bairro: String(alteracoes.endereco.bairro || '').trim(),
          cidade: String(alteracoes.endereco.cidade || '').trim()
        }
      };
      alunos[matricula].email = camposEditaveis.email;
      alunos[matricula].telefone = camposEditaveis.telefone;
      alunos[matricula].endereco = angular.copy(camposEditaveis.endereco);
      try { $window.localStorage.setItem(chave(matricula), JSON.stringify(camposEditaveis)); }
      catch (_) { /* Persistência em memória permanece disponível. */ }
      return obter(matricula);
    }

    return {obter: obter, salvar: salvar};
  });
}());
