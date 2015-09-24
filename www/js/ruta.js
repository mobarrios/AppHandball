$(document).ready(function() {
    var map;
    var address = "Avenida 9 de julio 1966, capital federal";

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

            destination: address,

            travelMode: google.maps.DirectionsTravelMode['DRIVING'],

            unitSystem: google.maps.DirectionsUnitSystem['METRIC'],

            provideRouteAlternatives: true

        };
        directionsService.route(request, function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                directionsDisplay.setMap(map);

                directionsDisplay.setPanel($("#panel_ruta").get(0));

                directionsDisplay.setDirections(response);
            }
        });
    });
});