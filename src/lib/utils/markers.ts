import mapboxgl from 'mapbox-gl';

export const createMarker = (coords: mapboxgl.LngLatLike): mapboxgl.Marker => {
    const marker = new mapboxgl.Marker({
        element: setMarkerStyle(),
        anchor: 'bottom',
        offset: [0, 12] // translate cause shadow in image
    }).setLngLat(coords);

    return marker;
}

const setMarkerStyle = (): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'lmc-maps__marker';

    return el;
}
