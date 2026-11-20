(function () {
  'use strict';

  angular.module('ucsalApp').factory('FinanceiroService', function () {
    // Mensalidades, valores e linhas digitáveis inteiramente fictícios.
    var mensalidades = {
      '2025.2': [
        {id: 1, mes: 'Julho/2025', vencimento: '10/07/2025', valor: 825, status: 'Paga'},
        {id: 2, mes: 'Agosto/2025', vencimento: '10/08/2025', valor: 825, status: 'Paga'},
        {id: 3, mes: 'Setembro/2025', vencimento: '10/09/2025', valor: 825, status: 'Paga'},
        {id: 4, mes: 'Outubro/2025', vencimento: '10/10/2025', valor: 825, status: 'Paga'},
        {id: 5, mes: 'Novembro/2025', vencimento: '10/11/2025', valor: 825, status: 'Paga'},
        {id: 6, mes: 'Dezembro/2025', vencimento: '10/12/2025', valor: 825, status: 'Paga'}
      ],
      '2026.1': [
        {id: 7, mes: 'Janeiro/2026', vencimento: '10/01/2026', valor: 860, status: 'Paga'},
        {id: 8, mes: 'Fevereiro/2026', vencimento: '10/02/2026', valor: 860, status: 'Paga'},
        {id: 9, mes: 'Março/2026', vencimento: '10/03/2026', valor: 860, status: 'Paga'},
        {id: 10, mes: 'Abril/2026', vencimento: '10/04/2026', valor: 860, status: 'Paga'},
        {id: 11, mes: 'Maio/2026', vencimento: '10/05/2026', valor: 860, status: 'Paga'},
        {id: 12, mes: 'Junho/2026', vencimento: '10/06/2026', valor: 860, status: 'Paga'}
      ],
      '2026.2': [
        {id: 13, mes: 'Julho/2026', vencimento: '10/07/2026', valor: 890, status: 'Paga'},
        {id: 14, mes: 'Agosto/2026', vencimento: '10/08/2026', valor: 890, status: 'Paga'},
        {id: 15, mes: 'Setembro/2026', vencimento: '10/09/2026', valor: 890, status: 'Paga'},
        {id: 16, mes: 'Outubro/2026', vencimento: '10/10/2026', valor: 890, status: 'Paga'},
        {id: 17, mes: 'Novembro/2026', vencimento: '10/11/2026', valor: 890, status: 'A Pagar', codigo: '00000.00000 00000.000000 00000.000000 1 00000000089000'},
        {id: 18, mes: 'Dezembro/2026', vencimento: '10/12/2026', valor: 890, status: 'A Pagar', codigo: '11111.11111 11111.111111 11111.111111 2 00000000089000'}
      ]
    };

    return {
      listarSemestres: function () { return Object.keys(mensalidades).sort().reverse(); },
      buscarPorSemestre: function (semestre) { return angular.copy(mensalidades[semestre] || []); }
    };
  });
}());
