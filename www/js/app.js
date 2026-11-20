(function () {
  'use strict';

  angular.module('ucsalApp', ['ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {
      // Cada rota da SPA conecta uma tela HTML com um Controller.
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        })
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'MenuCtrl'
        })
        .state('app.noticias', {
          url: '/noticias',
          views: {
            menuContent: {
              templateUrl: 'templates/noticias.html',
              controller: 'NoticiasCtrl'
            }
          }
        })
        .state('app.noticia', {
          url: '/noticias/:id',
          views: {
            menuContent: {
              templateUrl: 'templates/noticia-detalhe.html',
              controller: 'NoticiaDetalheCtrl'
            }
          }
        })
        .state('app.perfil', {
          url: '/perfil',
          views: {
            menuContent: {
              templateUrl: 'templates/perfil.html',
              controller: 'PerfilCtrl'
            }
          }
        })
        .state('app.financeiro', {
          url: '/financeiro',
          views: {
            menuContent: {
              templateUrl: 'templates/financeiro.html',
              controller: 'FinanceiroCtrl'
            }
          }
        });

      $urlRouterProvider.otherwise('/login');
    })
    .run(function ($rootScope, $state, AuthService) {
      // Impede abrir as telas internas digitando a URL sem fazer login.
      $rootScope.$on('$stateChangeStart', function (event, destino) {
        if (destino.name.indexOf('app') === 0 && !AuthService.estaAutenticado()) {
          event.preventDefault();
          $state.go('login');
        }
      });
    });
}());
