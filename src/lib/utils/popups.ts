import mapboxgl from 'mapbox-gl';

export const createPopup = (feature: mapboxgl.MapboxGeoJSONFeature): mapboxgl.Popup => {
    if (feature.geometry.type !== 'Point') {
        return null;
    }

    const [lon, lat] = feature.geometry.coordinates;

    const popup = new mapboxgl.Popup({
        offset: [0, -12],
        closeButton: false,
        className: 'lmc-maps__popup'
    })
        .setLngLat({ lon, lat })
        .setHTML(`<div>${feature.properties.name}</div>`);

    return popup;
};
