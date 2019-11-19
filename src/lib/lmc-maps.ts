import mapboxgl from 'mapbox-gl';

import './lmc-maps.scss';

import { MapsOptions, Languages, MapStyle } from './types';
import { STYLES } from './constants';

import { setLanguage } from './utils/languages';
import { createMarker } from './utils/markers';

declare const TILESERVER_URL: string;

class LmcMaps {

    container: string;

    map: mapboxgl.Map;

    coords: mapboxgl.LngLatLike;

    zoom: number;

    style: MapStyle;

    lang: Languages;

    hasMarker: boolean;

    authToken: string;

    constructor(options: MapsOptions) {
        this.container = options.container;
        this.coords = options.coords || [14.4563172, 50.1028914];
        this.zoom = options.zoom || 12;

        this.style = (options.style || STYLES.DEFAULT) as MapStyle;

        this.lang = options.lang as Languages || null;

        this.hasMarker = options.hasMarker;

        this.authToken = options.authToken;

        this.init();
    }

    init() {
        this.map = new mapboxgl.Map({
            container: this.container,
            style: `${STYLES.URL}${this.style}/style.json`,
            center: this.coords,
            zoom: this.zoom,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: (url, resourceType) => {
                if (this.authToken && url.startsWith(TILESERVER_URL) && resourceType === 'Tile') {
                    return {
                        url: url,
                        headers: {
                            'Authorization': 'Bearer ' + this.authToken
                        }
                    }
                }
            }
        });

        this.getEvents();

        this.setControls();

        this.hasMarker && createMarker(this.coords).addTo(this.map);
    }

    getEvents() {
        this.map.on('load', () => {
            this.lang && this.map.setStyle(setLanguage(this.map.getStyle(), this.lang), {
                diff: true
            });
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
}

export default LmcMaps;
