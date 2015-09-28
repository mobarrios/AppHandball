var app = angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $state) {

$scope.update = function(){

 window.localStorage.removeItem('teams');
 window.localStorage.removeItem('restos');


  $http.get('http://www.navcoder.net/sistemas/content/public/ws/teams/eyJpdiI6IlFhZjBSVTlKVXVuUDliR3pISGtoeWc9PSIsInZhbHVlIjoiRUh2TU1mVUxyZGV5Vmh2V29NblJiYURGbVREaXFSN3VCeisyQWpGaHBUNGxGdmRGZ3NmVGdaMWVtUmhXaVZPOSIsIm1hYyI6IjQxMjBhMzZjNmNlY2FmZjU0OGZlNmQzNWMwNTEzYzBhYjQ1ZDYzNDkxZWRkNjBjY2UzOGQ5ODFlM2U0NWZhZjAifQ==')
    .success(function(response){
     window.localStorage['teams'] = JSON.stringify(response); 
    });

   $http.get('http://www.navcoder.net/sistemas/content/public/ws/restos/eyJpdiI6IlFhZjBSVTlKVXVuUDliR3pISGtoeWc9PSIsInZhbHVlIjoiRUh2TU1mVUxyZGV5Vmh2V29NblJiYURGbVREaXFSN3VCeisyQWpGaHBUNGxGdmRGZ3NmVGdaMWVtUmhXaVZPOSIsIm1hYyI6IjQxMjBhMzZjNmNlY2FmZjU0OGZlNmQzNWMwNTEzYzBhYjQ1ZDYzNDkxZWRkNjBjY2UzOGQ5ODFlM2U0NWZhZjAifQ==')
    .success(function(response){
     window.localStorage['restos'] = JSON.stringify(response); 
    });
  


};

$scope.doRefresh = function(){
 
 window.localStorage.removeItem('restos');

    $http.get('http://www.navcoder.net/sistemas/content/public/ws/restos/eyJpdiI6IlFhZjBSVTlKVXVuUDliR3pISGtoeWc9PSIsInZhbHVlIjoiRUh2TU1mVUxyZGV5Vmh2V29NblJiYURGbVREaXFSN3VCeisyQWpGaHBUNGxGdmRGZ3NmVGdaMWVtUmhXaVZPOSIsIm1hYyI6IjQxMjBhMzZjNmNlY2FmZjU0OGZlNmQzNWMwNTEzYzBhYjQ1ZDYzNDkxZWRkNjBjY2UzOGQ5ODFlM2U0NWZhZjAifQ==')
    .success(function(response)
    {
     window.localStorage['restos'] = JSON.stringify(response); 
    })
    .finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
            window.location.reload();

    });


};


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


        .factory("cargarMapa",function(){
          var direccion = "Av. 9 de julio 1666, buenos aires";
          var mapa = {
            setDireccion : function (dir) {
              direccion = dir;
            },
            getDireccion : function(){
              return direccion;
            },
            setMapa : function () {
              google.maps.event.addDomListener(window, 'load', function() {
                var map = new google.maps.Map(document.getElementById('maps'), {
                  zoom: 16
                });
                var geocoder = new google.maps.Geocoder();

                geocodeAddress(geocoder, map);


                function geocodeAddress(geocoder, resultsMap) {
                  geocoder.geocode({'address': direccion}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      resultsMap.setCenter(results[0].geometry.location);
                      var marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                      });
                    } else {
                      alert('No encontró la dirección por: ' + status);
                    }
                  });
                }

                return map;
              });
            }
          };

          return mapa;
        })


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

<<<<<<< HEAD
.controller('restsController',function($scope){


    $scope.rests = JSON.parse(window.localStorage['restos'] || '{}');
  

})

=======
.controller('restsController',function($scope,cargarMapa){

  $scope.rests = JSON.parse(window.localStorage['restos'] || '{}');
          $scope.reload = function(){
            window.location.reload();
          };

      $scope.getAddress = function(address){
        address = address.address;
        cargarMapa.setDireccion(address);
      }
})

.controller('equiposController',function($scope, $http) {
    $scope.name = JSON.parse(window.localStorage['teams'] || '{}');

        //  $http.get('http://www.navcoder.net/sistemas/content/public/ws/teams/eyJpdiI6IlFhZjBSVTlKVXVuUDliR3pISGtoeWc9PSIsInZhbHVlIjoiRUh2TU1mVUxyZGV5Vmh2V29NblJiYURGbVREaXFSN3VCeisyQWpGaHBUNGxGdmRGZ3NmVGdaMWVtUmhXaVZPOSIsIm1hYyI6IjQxMjBhMzZjNmNlY2FmZjU0OGZlNmQzNWMwNTEzYzBhYjQ1ZDYzNDkxZWRkNjBjY2UzOGQ5ODFlM2U0NWZhZjAifQ==').success(function(response){
        //     $scope.name = response;
        //   });
    })

.controller('mapController',function($scope){
  $scope.map = [];

})


.controller('jugadoresController',function($scope, $stateParams){
 
 $scope.param = $stateParams.equiposId;


  $scope.jugadores = [
    { name: 'Cesar, Diego', foto:'foto.jpg' },
    { name: 'Perez, Juan', foto:'foto.jpg'}
  ];
})


.controller('PlaylistCtrl', function($scope, $stateParams,cargarMapa) {
      var vm = this;

.controller('jugadoresController',function($scope, $stateParams, $filter){
 
var id_team = $stateParams.equiposId;
$scope.name = JSON.parse(window.localStorage['teams'] || '{}');


 var a = $scope.name.filter(function(data) {
      return (data.id == id_team);
  });

 $scope.jugadores = a;

  //$scope.jugadores = [
  //  { name: 'Cesar, Diego', foto:'foto.jpg' },
  //  { name: 'Perez, Juan', foto:'foto.jpg'},
  //];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
