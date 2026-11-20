(function () {
  'use strict';

  angular.module('ucsalApp').factory('AuthService', function () {
    // Credenciais fictícias apenas para avaliação acadêmica. Nunca usar em produção.
    var usuarios = [
      {matricula: '20261001', senha: '123456', nome: 'Ana Souza', curso: 'Engenharia de Software'},
      {matricula: '20261002', senha: 'abcdef', nome: 'Lucas Santos', curso: 'Engenharia de Software'}
    ];
    var usuarioAtual = null;

    function entrar(matricula, senha) {
      var encontrado = usuarios.find(function (item) {
        return item.matricula === String(matricula || '').trim() && item.senha === String(senha || '');
      });

      if (!encontrado) { return null; }
      // Não expomos nem guardamos a senha no objeto da sessão.
      usuarioAtual = {
        matricula: encontrado.matricula,
        nome: encontrado.nome,
        curso: encontrado.curso
      };
      return angular.copy(usuarioAtual);
    }

    return {
      entrar: entrar,
      obterUsuarioAtual: function () { return usuarioAtual ? angular.copy(usuarioAtual) : null; },
      estaAutenticado: function () { return Boolean(usuarioAtual); },
      sair: function () { usuarioAtual = null; }
    };
  });
}());
