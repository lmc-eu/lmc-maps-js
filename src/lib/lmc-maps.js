import mapboxgl from 'mapbox-gl';

import * as con from './constants';

import './lmc-maps.scss';

class LmcMaps {

    container;
    map;
    coords;
    zoom;
    style;
    lang;
    marker;

    constructor(container, options) {
        this.container = container;
        this.coords = options.coords || [14.4563172, 50.1028914];
        this.zoom = options.zoom || 12;

        this.style = `${con.STYLES_URL}${
            con.STYLES.indexOf(options.style) !== -1 ? options.style : con.STYLES[0]
        }`;
        this.lang = options.lang || null;
        this.marker = options.marker;

        this.init();
    }

    init() {
        this.map = new mapboxgl.Map({
            container: this.container,
            style: this.style,
            center: this.coords,
            zoom: this.zoom,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: (url, resourceType) => {
                if (url.startsWith(TILESERVER_URL) && resourceType === 'Tile') {
                    return {
                        url: url,
                        headers: {
                            'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FVXdOVGd5TkVVeFFUVTBRa1V4T1RnME1qbEdOa1JDUWpFMU16SXhSREZCUkRVeVJrRTBRZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1qaWh5LmF1dGgwLmNvbS8iLCJzdWIiOiJ1dXA5c3A1aDdrbHVSWEVIbWh2VXJlOTJIZHJrbFZxY0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtamloeS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU3Mjk0MDY0NCwiZXhwIjoxNTc1NTMyNjQ0LCJhenAiOiJ1dXA5c3A1aDdrbHVSWEVIbWh2VXJlOTJIZHJrbFZxYyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SwkoiZWQdvi-ioNC20WX8IPVUVtTp-3YBX7xNpWDiDzgwGlzvi8Ji3agRLJnGOdunZW1Y0LohF6_fFMcX5ErYsxuon3QYasb_9tMK0tA7Qclz0_3Uml0OMlX4tBT0b1Y3xZxy4iPDjh6S22d3YBGUhRH9PPD6J9k_FQ_7T2qSvMQ2iviASeB0xGXhHvY_xgefO--lyeGI0o94dvYHHvvSz5kDCSU9KuQ9c7qInkKrDAhr5kn5arX_T3khWanUyk5-NY_rfP-HTbv6rbGFPlLIzNUg1jkIsnX54lr2Raky1Nv60xxADxzj2Y2fZLu7yYCGuNOH4LAwLx_Jv6G-1-MXA'
                        }
                    }
                }
            }
        });

        this.getEvents();

        this.setControls();
        this.marker && this.renderMarker(this.coords);
    }

    getEvents() {
        this.map.on('load', () => {
            con.LANGUAGES.indexOf(this.lang) !== -1 && this.setLanguage(this.lang);
        });
    }

    setLanguage(lang) {
        const style = JSON.parse(JSON.stringify(this.map.getStyle()));

        const nameFallbackLayers = [];

        style.layers.forEach((layer, index) => {
            if (layer.id.indexOf('label') !== -1 && layer.layout['text-field']) { 
                nameFallbackLayers.push([index, JSON.parse(JSON.stringify(layer))]);
                this.addLayerFilter(layer, ['has', `name:${lang}`]);
                layer.layout['text-field'] = `{name:${lang}}`;
            }
        });

        nameFallbackLayers.forEach((layer, index) => {
            layer[1].id = layer[1].id + '-langFallback';
            this.addLayerFilter(layer[1], ['!has', `name:${lang}`]);
            style.layers.splice(layer[0] + index + 1, 0, layer[1]);
        });

        this.map.setStyle(style, {
            diff: true
        });
    }

    setControls() {
        this.map.addControl(new mapboxgl.NavigationControl({
            showCompass: false
        }));

        this.map.addControl(new mapboxgl.ScaleControl({
            maxWidth: 80
        }));
    }

    renderMarker(coords) {
        new mapboxgl.Marker({
            element: this.setMarkerStyle(),
            anchor: 'bottom',
            offset: [0, 12] // translate cause shadow in image
        }).setLngLat(coords)
          .addTo(this.map);
    }

    setMarkerStyle() {
        const el = document.createElement('div');
        el.className = 'lmc-maps__marker';

        return el;
    }

    addLayerFilter(layer, filter) {
        if (!layer.filter) {
            layer.filter = filter;
        } else if (layer.filter[0] === 'all') {
            layer.filter.push(filter);
        } else {
            layer.filter = [
                'all',
                layer.filter,
                filter
            ];
        }
    }
}

export default LmcMaps;
