(function () {
  'use strict';

  angular.module('ucsalApp').factory('NoticiasService', function () {
    // Publicações de exemplo: não são comunicados oficiais da universidade.
    var publicacoes = [
      {
        id: 1, titulo: 'Prazo de rematrícula para o próximo semestre',
        data: '12/11/2026', categoria: 'Notícia', imagem: 'img/rematricula.svg',
        resumo: 'Confira as orientações de exemplo para organizar a sua rematrícula.',
        conteudo: 'Este é um comunicado demonstrativo para o protótipo acadêmico. No aplicativo real, o aluno encontraria aqui as datas oficiais, documentos necessários e orientações para realizar a rematrícula no semestre seguinte. Consulte sempre os canais oficiais da UCSal para informações verdadeiras.'
      },
      {
        id: 2, titulo: 'Atividades da Semana de Mobilização Científica',
        data: '08/11/2026', categoria: 'Evento', imagem: 'img/semoc.svg',
        resumo: 'Uma programação de exemplo com palestras e apresentações de projetos.',
        conteudo: 'A Semana de Mobilização Científica é utilizada aqui como exemplo de atividade universitária. Este card ilustra uma programação com palestras, apresentações de trabalhos e troca de conhecimentos entre estudantes e professores. As datas e a programação desta publicação são fictícias.'
      },
      {
        id: 3, titulo: 'Maratona de programação para estudantes',
        data: '03/11/2026', categoria: 'Evento', imagem: 'img/programacao.svg',
        resumo: 'Evento fictício para incentivar a resolução de desafios de programação.',
        conteudo: 'Nesta atividade demonstrativa, equipes de estudantes resolvem desafios de programação, exercitam lógica e trabalham de forma colaborativa. O objetivo do registro é mostrar como o Portal do Aluno pode divulgar oportunidades acadêmicas e eventos de tecnologia.'
      },
      {
        id: 4, titulo: 'Edital de iniciação científica: orientações',
        data: '28/10/2026', categoria: 'Notícia', imagem: 'img/pesquisa.svg',
        resumo: 'Exemplo de publicação sobre oportunidades de pesquisa acadêmica.',
        conteudo: 'Este conteúdo é ilustrativo e não representa um edital em vigor. Em um portal real, a notícia poderia informar os requisitos de inscrição, as etapas do processo seletivo e os links oficiais de um programa de iniciação científica.'
      },
      {
        id: 5, titulo: 'Projeto de extensão nos campi da UCSal',
        data: '22/10/2026', categoria: 'Evento', imagem: 'img/extensao.svg',
        resumo: 'Conheça uma atividade de extensão simulada para o portal.',
        conteudo: 'Este exemplo apresenta uma ação de extensão para aproximar a comunidade acadêmica e a sociedade. No protótipo, a notícia demonstra a apresentação de local, descrição e detalhes de uma atividade realizada em um dos campi.'
      }
    ];

    return {
      listar: function () { return angular.copy(publicacoes); },
      buscarPorId: function (id) {
        var encontrado = publicacoes.find(function (item) { return item.id === Number(id); });
        return encontrado ? angular.copy(encontrado) : null;
      }
    };
  });
}());
