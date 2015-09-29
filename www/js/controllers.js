var app = angular.module('starter.controllers', ['ionic'])

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
        var direccion = window.localStorage['direccion'];
        var mapa = {
            setDireccion : function (dir) {
                window.localStorage['direccion'] = dir;
                direccion = window.localStorage['direccion'];
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

    .factory("cargarRuta",function(){
        var direccion = window.localStorage['direccion'];
        var restaurant = window.localStorage['restaurant'];
        var ruta = {
            getRestaurant : function(){
                return restaurant;
            },
            loadRoute : function(){
                google.maps.event.addDomListener(window, 'load', function() {
                    var directionsDisplay;

                    var directionsService;


                    navigator.geolocation.getCurrentPosition(function (posObj) {

                        var coordenadas = posObj.coords;

                        var myLatlng = new google.maps.LatLng(coordenadas.latitude, coordenadas.longitude);

                        var myOptions = {

                            zoom: 17,

                            center: myLatlng,

                            mapTypeId: google.maps.MapTypeId.ROADMAP

                        };


                        var div = document.getElementById('route_map_canvas');

                        map = new google.maps.Map(div, myOptions);

                        directionsDisplay = new google.maps.DirectionsRenderer();

                        directionsService = new google.maps.DirectionsService();


                        var request = {

                            origin: myLatlng,

                            destination: direccion,

                            travelMode: google.maps.DirectionsTravelMode['DRIVING'],

                            unitSystem: google.maps.DirectionsUnitSystem['METRIC'],

                            provideRouteAlternatives: true

                        };
                        directionsService.route(request, function (response, status) {

                            if (status == google.maps.DirectionsStatus.OK) {

                                directionsDisplay.setMap(map);

                                directionsDisplay.setPanel(document.getElementById('panel_ruta'));

                                directionsDisplay.setDirections(response);
                            }
                        });

                    });
                });
                    return map;
            }
        };
        return ruta;
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


.controller('restsController',function($scope,cargarMapa){
    $scope.rests = JSON.parse(window.localStorage['restos'] || '{}');

    $scope.items = {

    };

    $scope.getAddress = function(restaurant){
        window.localStorage['restaurant'] = angular.toJson(restaurant);
        address = restaurant.address;
        cargarMapa.setDireccion(address);
        window.location.reload();
    }

})


.controller('equiposController',function($scope, $http) {
    $scope.name = JSON.parse(window.localStorage['teams'] || '{}');

})

.controller('mapController',function($scope,cargarRuta){
        $scope.rest = angular.fromJson(cargarRuta.getRestaurant());
        $scope.map = cargarRuta.loadRoute();
})


//.controller('jugadoresController',function($scope, $stateParams){
//
// $scope.param = $stateParams.equiposId;
//
//
//  $scope.jugadores = [
//    { name: 'Cesar, Diego', foto:'foto.jpg' },
//    { name: 'Perez, Juan', foto:'foto.jpg'}
//  ];
//})


.controller('jugadoresController',function($scope, $stateParams, $filter){
 
var id_team = $stateParams.equiposId;
$scope.name = JSON.parse(window.localStorage['teams'] || '{}');


 var a = $scope.name.filter(function(data) {
      return (data.id == id_team);
  });

 $scope.jugadores = a;

})

.controller('PlaylistCtrl', function($scope, $stateParams,cargarMapa) {
    var vm = this;

    vm.direccion = cargarMapa.getDireccion();

    vm.mapa = cargarMapa.setMapa(vm.direccion);

    $scope.map = vm.mapa;

    $scope.rest = angular.fromJson(window.localStorage['restaurant']);

    $scope.reload = function(){
        window.location.reload();
    }
});
