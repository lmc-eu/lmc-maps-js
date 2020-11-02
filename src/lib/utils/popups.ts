import mapboxgl from 'mapbox-gl';
import { getTranslation } from './translations';
import { Languages } from '../types';

export const createPopup = (
    feature: mapboxgl.MapboxGeoJSONFeature,
    lang: Languages
): mapboxgl.Popup => {
    if (feature.geometry.type !== 'Point') {
        return null;
    }

    const [lon, lat] = feature.geometry.coordinates;

    let stationName = feature.properties.name;

    if (stationName === undefined) {
        stationName = getTranslation(lang, feature.layer.id);
    }

    const popup = new mapboxgl.Popup({
        offset: [0, -12],
        closeButton: false,
        className: 'lmc-maps__popup'
    })
        .setLngLat({ lon, lat })
        .setHTML(`<div>${stationName}</div>`);

    return popup;
};
