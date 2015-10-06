// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  
    .state('app.home',{
        url:'/home',
       views: {
        'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }

    })

.state('app.fixture', {
    url: '/fixture',
    views: {
      'menuContent': {
        templateUrl: 'templates/fixture.html',
         controller: 'fixtureController'
      }
    }
  })

.state('app.estadios', {
    url: '/estadios',
    views: {
      'menuContent': {
        templateUrl: 'templates/estadios.html',
         controller: 'estadiosController'
      }
    }
  })


  .state('app.rests', {
    url: '/rests',
    views: {
      'menuContent': {
        templateUrl: 'templates/rests2.html',
         controller: 'restsController2'
      }
    }
  })


  .state('app.detail', {
    url: '/detail/:type',
    views: {
      'menuContent': {
        templateUrl: 'templates/rests.html',
         controller: 'restsController'
      }
    }
  })
 

.state('app.turismo', {
    url: '/turismo',
    views: {
      'menuContent': {
        templateUrl: 'templates/turismo.html',
         controller: 'turismoController'
      }
    }
  })

.state('app.excursiones', {
    url: '/excursiones',
    views: {
      'menuContent': {
        templateUrl: 'templates/excursiones.html',
         controller: 'excursionesController'
      }
    }
  })

.state('app.compras', {
    url: '/compras',
    views: {
      'menuContent': {
        templateUrl: 'templates/compras.html',
         controller: 'comprasController'
      }
    }
  })

.state('app.comprasdetail', {
    url: '/comprasdetail/:type',
    views: {
      'menuContent': {
        templateUrl: 'templates/comprasdetail.html',
         controller: 'comprasdetailController'
      }
    }
  })


  .state('app.equipos', {
      url: '/equipos',
      views: {
        'menuContent': {
          templateUrl: 'templates/equipos.html',
          controller: 'equiposController'
        }
      }
    })

    .state('app.jugadores', {
      url: '/jugadores/:equiposId',
      views: {
        'menuContent': {
          templateUrl: 'templates/jugadores.html',
          controller: 'jugadoresController'
        }
      }
    })




    .state('app.playlists', {
      url: '/playlists/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    })


    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'mapController'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
