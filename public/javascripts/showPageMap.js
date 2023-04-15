mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: toursite.geometry.coordinates,
    zoom: 7,
    minZoom: 3.5,
    maxZoom: 7
});


const marker = new mapboxgl.Marker()
    .setLngLat(toursite.geometry.coordinates)
    .setPopup(
        popup = new mapboxgl.Popup({
            offset: 20,
            closeButton: false,
            closeOnClick: false
        })
            .setHTML(`<h6>${toursite.title}</h6>`)
    )
    .addTo(map)

const markerDiv = marker.getElement();
markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

