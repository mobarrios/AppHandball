$(document).ready(function() {
    var map;
    var address = "Avenida 9 de julio 1966, capital federal";


        // CREO EL OBJETO GEOCODER
        var geocoder = new google.maps.Geocoder();

        //PASO LA DIRECCIÓN EN EL ATRIBUTO GEOCODE DEL GEOCODER
        geocoder.geocode({ 'address': address}, geocodeResult);

        function geocodeResult(results, status) {
            if (status == 'OK') { //VE SI HAY RESULTADO
                var mapOptions = {
                    center: results[0].geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map($("#map_canvas").get(0), mapOptions);

                map.fitBounds(results[0].geometry.viewport);//ACERCA EL MAPA A DONDE ESTAMOS APUNTANDO
                //DIBUJO DEL MARKER
                var markerOptions = { position: results[0].geometry.location,title: address };
                var marker = new google.maps.Marker(markerOptions);
                marker.setMap(map);
            }
        }





});
