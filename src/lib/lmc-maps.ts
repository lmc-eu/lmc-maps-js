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

    bounds: mapboxgl.LngLatBounds;

    coords: Array<mapboxgl.LngLatLike>;

    center: mapboxgl.LngLatLike;

    zoom: number;

    style: MapStyle;

    lang: Languages;

    hasMarker: boolean;

    authToken: string;

    publicUrl: string;

    constructor(options: MapsOptions) {
        this.container = options.container;

        this.coords = options.coords;

        this.center = options.center;

        this.zoom = options.zoom ;

        this.style = options.style || STYLES.DEFAULT;

        this.lang = options.lang;

        this.hasMarker = options.hasMarker;

        this.authToken = options.authToken;

        this.publicUrl = options.publicUrl || TILESERVER_URL;

        this.init();
    }

    init() {
        this.map = new mapboxgl.Map({
            container: this.container,
            style: `${this.publicUrl}/styles/${this.style}/style.json`,
            center: this.center || [14.4563172, 50.1028914],
            zoom: this.zoom || 12,
            renderWorldCopies: false,
            pitchWithRotate: false,
            transformRequest: (url, resourceType) => {
                if (this.authToken && url.startsWith(this.publicUrl) && resourceType === 'Tile') {
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

        this.coords && this.computeMapPoints();
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

    computeMapPoints() {
        this.bounds = new mapboxgl.LngLatBounds();

        this.coords.forEach((coord: mapboxgl.LngLatLike): void => {
            if (this.hasMarker) {
                createMarker(coord).addTo(this.map);
            }

            const convertedCoord = mapboxgl.LngLat.convert(coord);
            this.bounds.extend(new mapboxgl.LngLat(convertedCoord.lng, convertedCoord.lat));
        });

        !this.center && this.map.fitBounds(this.bounds, {
            maxZoom: this.zoom || 12,
            padding: 70, // in px, to make markers on the top edge visible
            duration: 0,
        });
    }
}

export default LmcMaps;
